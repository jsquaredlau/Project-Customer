import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
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

  public path = '';
  public business: string = "BASYXLab";
  public points: number = 125;
  public qrcode;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _sanitizer: DomSanitizer) {
    var qrcode = new QRCode({
      content: JSON.stringify({
        business: this.navParams.get('business'),
        address: this.navParams.get('address'),
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipCard');
  }

  openActions() {
    console.log('Need to open page to different FX');
  }

}
