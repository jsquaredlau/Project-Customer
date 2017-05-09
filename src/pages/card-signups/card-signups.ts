import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountService } from '../../providers/account-service';

/**
 * Generated class for the CardSignups page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-card-signups',
  templateUrl: 'card-signups.html',
})
export class CardSignups {

  constructor(public navCtrl: NavController, public navParams: NavParams, private accountService: AccountService) {
    console.log('lol');
    console.log(this.accountService.findAvailableMemberships());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardSignups');
  }

}
