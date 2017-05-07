import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from "@angular/http";
import 'rxjs/add/operator/map';

/*
  Generated class for the AccountService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AccountService {

  public username: string = null;
  public memberships = {};

  private providers = {
    laas1: "http://jsquared.ga:3000/api/v1"
  };

  constructor(public http: Http) {
    console.log('Hello AccountService Provider');
  }

  public findMemberships(username: string): any {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions(({ headers: headers }));
    for (const provider in this.providers) {
      this.http.post(
        this.providers[provider] + '/mobile/users/membership/list',
        {
          fbId: this.username
        },
        options
      )
        .subscribe(
        (data) => {
          this.memberships = data.json();
          return true;
        },
        (error) => {
          return false;
        }
        )
    }
  }

  public makeMembership(laas: string, business: string, username: string): any {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions(({ headers: headers }));
    this.http.post(
      this.providers[laas] + '/mobile/laas/' + business + 'user/new',
      {
        fbId: username,
        password: 'password'
      },
      options
    )
      .subscribe(
      (data) => {
        return this.memberships[business] = data.json()[business];
      },
      (error) => {
        return null;
      }
      )
  }

}
