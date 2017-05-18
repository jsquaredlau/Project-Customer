import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast, ToastOptions } from '@ionic-native/toast';
import { AccountService } from '../../providers/account-service';

/**
 * Generated class for the PointConvertor page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-point-convertor',
  templateUrl: 'point-convertor.html',
  providers: [Toast]
})
export class PointConvertor {

  public points: number | string;
  public rate: string;
  public fromBusiness: string;
  public toBusiness: string;
  public finishedLoading: boolean;
  public amountReceivable: number | string;
  public amountToConvert: number;
  public pointsLoaded: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private accountService: AccountService, private toast: Toast) {
    this.finishedLoading = false;
    this.fromBusiness = this.navParams.get('business');
    this.toBusiness = this.navParams.get('partnerBusiness');
    this.points = 'Fetching ';
    this.amountReceivable = 0;
    this.amountToConvert = 0;
    if (this.navParams.get('business') === this.navParams.get('owner')) {
      this.rate = this.navParams.get('toOwnerFx') + ' : ' + this.navParams.get('toPartnerFx');
    } else {
      this.rate = this.navParams.get('toPartnerFx') + ' : ' + this.navParams.get('toOwnerFx');
    }
    this.finishedLoading = true;
  }

  ionViewWillEnter() {
    this.checkAvailablelBalance();
  }

  checkAvailablelBalance() {
    this.points = 'Fetching ';
    this.accountService.pointCheck(this.navParams.get('provider'), this.navParams.get('business'), this.accountService.username, this.navParams.get('address'))
      .map(res => res.json())
      .subscribe((result) => {
        this.points = parseInt(result.balance);
        this.pointsLoaded = true;
      }, (error) => {
        console.log(JSON.stringify(error));
      });
  }

  checkAmountReceivable(amount: number) {
    this.amountReceivable = 'Checking receivable '
    this.accountService.pointConversionDryrun(this.navParams.get('provider'), this.navParams.get('business'), this.navParams.get('schemeName'), this.amountToConvert)
      .map(res => res.json())
      .subscribe((result) => {
        this.amountReceivable = result.amountReceivable;
      }, (error) => {
        console.log(JSON.stringify(error));
      });
  }

  runConversion() {
    if (this.amountToConvert <= this.points) {
      this.finishedLoading = false;
      this.accountService
        .runPointConversion(
        this.navParams.get('provider'),
        this.navParams.get('business'),
        this.navParams.get('schemeName'),
        this.amountToConvert,
        this.accountService.findMembershipAddress(this.navParams.get('business')),
        this.accountService.findMembershipAddress(this.navParams.get('partnerBusiness')))
        .map(res => res.json())
        .subscribe((result) => {
          this.points = <number>this.points - this.amountToConvert;
          this.finishedLoading = true;
          const toastOptions: ToastOptions = {
            message: 'Points Converted Successfully!',
            duration: 2000,
            position: 'center',
            styling: {
              opacity: 1,
              backgroundColor: '#4caf50',
              textColor: '#FFFFFF',
              cornerRadius: 5,
              horizontalPadding: 20,
              verticalPadding: 20
            }
          }

          this.toast.showWithOptions(toastOptions).subscribe();
        }, (error) => {
          this.finishedLoading = true;
          console.log(JSON.stringify(error));
        });
    } else {
      const toastOptions: ToastOptions = {
        message: 'Not enough points!',
        duration: 2000,
        position: 'bottom',
        styling: {
          opacity: 1,
          backgroundColor: '#e12927',
          textColor: '#FFFFFF',
          cornerRadius: 5,
          horizontalPadding: 10,
          verticalPadding: 10
        }
      }

      this.toast.showWithOptions(toastOptions).subscribe();
    }


  }
}
