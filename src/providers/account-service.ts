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
    // laas1: "http://localhost:3000/api/v1"
    laas1: "http://jsquared.ga:3000/api/v1",
    laas2: "http://jsquared.gq:30001/api/v1"
  };

  constructor(public http: Http) {
    console.log('Hello AccountService Provider');
  }

  public findAvailableMemberships() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions(({ headers: headers }));
    return Observable
      .forkJoin([
        this.http.get(this.providers['laas1'] + '/mobile/laas/businesses', options).map(res => res.json()),
        this.http.get(this.providers['laas2'] + '/mobile/laas/businesses', options).map(res => res.json()),
      ])
  }

  // public newMembership(laas: string, business: string, username: string) {
  //   this._newMembership(laas, business, username)
  //     .map(res => res.json())
  //     .subscribe((result) => {
  //       return result;
  //     },
  //     (error) => {
  //       console.log(error);
  //     })
  // }

  public newMembership(laas: string, business: string, username: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions(({ headers: headers }));
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
    // console.log(this.providers['laas1'] + '/mobile/user/membership/list');
    // return this.http.post(this.providers['laas1'] + '/mobile/user/membership/list', { fbId: this.username }, options)
    return Observable
      .forkJoin([
        this.http.get(this.providers['laas1'] + '/mobile/user/membership/list', options).map(res => res.json()),
        this.http.get(this.providers['laas2'] + '/mobile/user/membership/list', options).map(res => res.json()),
      ])
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
          provider: laas
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

  public pointConversionAgreements(laas: string, business: string, username: string): any {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions(({ headers: headers }));
    return this.http.post(
      this.providers[laas] + '/mobile/' + business + '/fx/list',
      {
        business: business,
        fbId: username
      },
      options
    )
  }

  public pointConversionDryrun(laas: string, business: string, schemeName: string, amount: number): any {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions(({ headers: headers }));
    return this.http.post(
      this.providers[laas] + '/mobile/' + business + '/fx/check',
      {
        schemeName: schemeName,
        amountToConvert: amount
      },
      options
    )
  }

  public runPointConversion(laas: string, business: string, schemeName: string, amountToConvert: number, customerFromAddress: string, customerToAddress: string): any {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions(({ headers: headers }));
    return this.http.post(
      this.providers[laas] + '/mobile/' + business + '/fx/convert',
      {
        schemeName: schemeName,
        amountToConvert: amountToConvert,
        customerFromAddress: customerFromAddress,
        customerToAddress: customerToAddress
      },
      options
    )
  }

  public findMembershipAddress(laas: string, business: string): string {
    for (const membership in this.membershipsList) {
      if (this.membershipsList[membership].provider === laas && this.membershipsList[membership].business === business) {
        return this.membershipsList[membership].address;
      }
    }
    return null;
  }

}
