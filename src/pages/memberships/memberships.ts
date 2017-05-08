import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountService } from '../../providers/account-service';
import 'rxjs/add/operator/map';

/**
 * Generated class for the Memberships page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-memberships',
  templateUrl: 'memberships.html',
})
export class Memberships {

  public finishedLoading: boolean;
  public items: Array<{ business: string, address: string, provider: string }> = [];

  public username: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private accountService: AccountService) {
    this.finishedLoading = false;
    this.accountService.findMemberships(this.accountService.username)
      .map(res => res.json())
      .subscribe((result) => {
        for (const membership in result) {
          this.items.push({
            business: membership,
            address: result[membership],
            provider: 'laas1'
          })
        }
        this.finishedLoading = true;
      },
      (error) => {
        console.log(error);
      });
  }

  ionViewDidLoad() {
    this.username = this.accountService.username;
    console.log('ionViewDidLoad Memberships');
  }

  addCard() {
    console.log('Need to add card');
  }

}
