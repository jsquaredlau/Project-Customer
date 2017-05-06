import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MembershipCard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-membership-card',
  templateUrl: 'membership-card.html',
})
export class MembershipCard {

  public business: string = "BASYXLab";
  public points: number = 125;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipCard');
  }

  openActions() {
    console.log('Need to open page to different FX');
  }

}
