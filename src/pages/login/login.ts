import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountService } from '../../providers/account-service';
import { Memberships } from '../memberships/memberships';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams, private accountService: AccountService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  public login(username: string) {
    this.accountService.username = username;
    this.navCtrl.setRoot(Memberships);
  }


}
