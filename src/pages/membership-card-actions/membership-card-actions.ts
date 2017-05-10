import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountService } from '../../providers/account-service';
import { PointConvertor } from '../point-convertor/point-convertor';
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

  public finishedLoading: boolean;
  public actions: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private accountService: AccountService) {
    this.finishedLoading = false;
  }

  ionViewWillEnter() {
    console.log(this.accountService.username);
    this.accountService.pointConversionAgreements(this.navParams.get('provider'), this.navParams.get('business'), this.accountService.username)
      .map(res => res.json())
      .subscribe(
      (data) => {
        this.actions = data['fxPartners'];
        this.finishedLoading = true;
      },
      (error) => {
        console.log(JSON.stringify(error));
        this.finishedLoading = true;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipCardActions');
  }

  openConvertor(action) {
    this.navCtrl.push(PointConvertor, { business: this.navParams.get('business'), provider: this.navParams.get('provider'), schemeName: action.schemeName, partnerBusiness: action.partner });
  }

}
