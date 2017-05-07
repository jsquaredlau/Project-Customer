import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountService } from '../../providers/account-service';

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

  public username: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private accountService: AccountService) {
  }

  ionViewDidLoad() {
    this.username = this.accountService.username;
    console.log('ionViewDidLoad Memberships');
  }

  addCard() {
    console.log('Need to add card');
  }

}
