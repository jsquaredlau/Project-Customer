import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from "@angular/http";
// import {Observable} from 'rxjs/Observable';
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
  public memberships: any;
  public membershipsList: Array<{ business: string, address: string, provider: string }> = [];

  private providers = {
    laas1: "http://jsquared.ga:3000/api/v1"
  };

  constructor(public http: Http) {
    console.log('Hello AccountService Provider');
  }

  public findMemberships(username: string): any {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions(({ headers: headers }));
    return this.http.post(
      this.providers['laas1'] + '/mobile/user/membership/list',
      {
        fbId: this.username
      },
      options
    )
    //   .map(res => res.json())
    //   .subscribe((laas1Data) => {
    //     laas1Data;
    //     /* WE NEED THIS FOR DOUBLE END POINTS */
    //     // this.http.post(this.providers['laas1'] + '/mobile/user/membership/list', { fbId: this.username }, options)
    //     //   .subscribe((laas2Data) => {
    //     //     for (const business in laas1Data.json()) {
    //     //       const info = {
    //     //         business: business,
    //     //         address: laas1Data.json()[business],
    //     //         provider: 'laas1'
    //     //       }
    //     //       this.membershipsList.push(info);
    //     //
    //     //       for (const business in laas1Data.json()) {
    //     //         const info = {
    //     //           business: business,
    //     //           address: laas1Data.json()[business],
    //     //           provider: 'laas2'
    //     //         }
    //     //         this.membershipsList.push(info);
    //     //       }
    //     //     }
    //     //   });
    //
    //     /* WE NEED THIS FOR SINGLE END POINT */
    //     // for (const business in laas1Data.json()) {
    //     //   console.log('Business is ' + business + ' and address is ' + laas1Data.json()[business]);
    //     //   const info = {
    //     //     business: business,
    //     //     address: laas1Data.json()[business],
    //     //     provider: 'laas1'
    //     //   }
    //     //   this.membershipsList.push(info);
    //     // }
    //     // this.membershipsList;
    //     // console.log(this.membershipsList);
    //     // return this.membershipsList;
    //     // console.log(laas1Data);
    //     // console.log('hola');
    //   })
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

}
