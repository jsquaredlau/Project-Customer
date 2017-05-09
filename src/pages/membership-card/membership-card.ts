import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
// import * as QR from 'qr-image';
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
    // console.log(JSON.stringify(QR.svgObject('I love QR!')));
    // this.path = QR.svgObject('I love QR (NOPE)kwebrfvik.adufiluaebrvliubSDI:CkubrI; KSEBFLIC FCES>K:ISEF;IBUSE .KJLHSER;ISRKJ/WE4FWEFA !').path;
    var qrcode = new QRCode({
      content: "Hello worldQ",
      padding: 0,
      width: 300,
      height: 300,
      color: "#000000",
      background: "#ffffff",
      ecl: "M"
    }).svg();

    this.qrcode = this._sanitizer.bypassSecurityTrustHtml(qrcode);
  }
  // console.log(qrcode);

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipCard');
  }

  openActions() {
    console.log('Need to open page to different FX');
  }

}
