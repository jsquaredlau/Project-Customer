import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the AccountService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AccountService {

  public username: string = 'doge';
  // public memberships: any;
  public membershipsList: Array<{ business: string, address: string, provider: string }> = [];

  private providers = {
    laas1: "http://jsquared.ga:3000/api/v1"
  };

  constructor(public http: Http) {
    console.log('Hello AccountService Provider');
  }

  public findAvailableMemberships() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions(({ headers: headers }));
    const availableBusinesses = [];
    Observable
      .forkJoin([
        this.http.get(this.providers['laas1'] + '/mobile/laas/businesses', options).map(res => res.json()),
        // this.http.get(this.providers['laas1'] + '/mobile/laas/businesses', options).map(res => res.json()),
      ])
      .subscribe((responses) => {
        const existing = this.existingMembership()
        for (const business in responses[0].businessList) {
          if (existing.indexOf(responses[0].businessList[business]) < 0) {
            availableBusinesses.push(responses[0].businessList[business]);
          } else {
            console.log(responses[0].businessList[business] + 'fell out');
          }
        }
        return availableBusinesses;
      });
  }

  private existingMembership() {
    const memberships = []
    for (const membership in this.membershipsList) {
      memberships.push(this.membershipsList[membership].business);
    }
    return memberships;
  }

  public newMembership(laas: string, business: string, username: string) {
    this._newMembership(laas, business, username)
      .map(res => res.json())
      .subscribe((result) => {
        return result;
      },
      (error) => {
        console.log(error);
      })
  }

  private _newMembership(laas: string, business: string, username: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions(({ headers: headers }));
    console.log('we got this far');
    return this.http.post(
      this.providers[laas] + '/mobile/laas/' + business + '/user/new',
      {
        fbId: username,
        password: 'password'
      },
      options
    )
  }

  public findMemberships(username: string): any {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions(({ headers: headers }));
    return this.http.post(this.providers['laas1'] + '/mobile/user/membership/list', { fbId: this.username }, options)
  }

  public makeMembership(laas: string, business: string, username: string): any {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions(({ headers: headers }));
    this.http.post(
      this.providers[laas] + '/mobile/laas/' + business + 'user/new', { fbId: username, password: 'password' }, options)
      .subscribe(
      (data) => {
        const info = {
          business: business,
          address: data.json()[business],
          provider: 'laas1'
        }
        this.membershipsList.push(info);
        return this.membershipsList;
      },
      (error) => {
        return null;
      })
  }

  public pointCheck(laas: string, business: string, username: string, address: string): any {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions(({ headers: headers }));
    return this.http.post(
      this.providers[laas] + '/mobile/user/' + business + '/points/check',
      {
        fbId: username,
        customerAddress: address
      },
      options
    )
  }

}
