import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountService } from '../../providers/account-service';
import { MembershipCardActions } from '../membership-card-actions/membership-card-actions';
import QRCode from 'qrcode-svg';

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

  public business: string;
  public points: number | string = 'Loading ';
  public qrcode;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _sanitizer: DomSanitizer, private accountService: AccountService) {
    this.business = this.navParams.get('business');
    var qrcode = new QRCode({
      content: JSON.stringify({
        business: this.navParams.get('business'),
        customerAddress: this.navParams.get('address'),
        fbId: this.accountService.username,
        provider: this.navParams.get('provider')
      }),
      padding: 0,
      width: 300,
      height: 300,
      color: "#000000",
      background: "#ffffff",
      ecl: "M"
    }).svg();
    this.qrcode = this._sanitizer.bypassSecurityTrustHtml(qrcode);
    this.accountService.pointCheck(this.navParams.get('provider'), this.navParams.get('business'), this.accountService.username, this.navParams.get('address'))
      .map(res => res.json())
      .subscribe((result) => {
        this.points = result.balance;
      },
      (error) => {
        console.log('### ' + error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipCard');
  }

  openActions() {
    this.navCtrl.push(MembershipCardActions, { business: this.navParams.get('business'), provider: this.navParams.get('provider'), address: this.navParams.get('address') });
  }

  refresh() {
    this.points = 'Fetching ';
    this.accountService.pointCheck(this.navParams.get('provider'), this.navParams.get('business'), this.accountService.username, this.navParams.get('address'))
      .map(res => res.json())
      .subscribe((result) => {
        this.points = result.balance;
      },
      (error) => {
        console.log('### ' + error);
      });
  }

}
