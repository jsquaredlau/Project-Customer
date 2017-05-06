import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MembershipCardActions page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-membership-card-actions',
  templateUrl: 'membership-card-actions.html',
})
export class MembershipCardActions {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipCardActions');
  }

  openConvertor(partnerBusiness: string) {
    console.log('Open convertor to convert to ' + partnerBusiness);
  }

}
