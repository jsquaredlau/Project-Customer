import { Component } from '@angular/core';
import { Toast, ToastOptions } from '@ionic-native/toast';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountService } from '../../providers/account-service';
import { Memberships } from '../memberships/memberships';

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
  providers: [Toast]
})
export class CardSignups {

  public availableBusinesses: Array<{ business: string, provider: string }>;
  public finishedLoading: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private accountService: AccountService, private toast: Toast) {
    this.finishedLoading = false;
    this.availableBusinesses = [];
    this.accountService.findAvailableMemberships()
      .subscribe((responses) => {
        const existing = this.existingMembership()
        for (const business in responses[0].businessList) {
          if (existing.indexOf(responses[0].businessList[business]) < 0) {
            this.availableBusinesses.push({
              business: responses[0].businessList[business],
              provider: 'laas1'
            });
          }
        }

        for (const business in responses[1].businessList) {
          if (existing.indexOf(responses[1].businessList[business]) < 0) {
            this.availableBusinesses.push({
              business: responses[1].businessList[business],
              provider: 'laas2'
            });
          }
        }
        this.finishedLoading = true;
      });
  }

  private existingMembership() {
    const memberships = [];
    for (const membership in this.accountService.membershipsList) {
      memberships.push(this.accountService.membershipsList[membership].business);
    }
    return memberships;
  }

  public signup(item: { business: string, provider: string }) {
    this.finishedLoading = false;
    this.accountService.newMembership(item.provider, item.business, this.accountService.username)
      .map(res => res.json)
      .subscribe(
      (result) => {
        console.log(JSON.stringify(result));
        this.finishedLoading = true;
        this.navCtrl.setRoot(Memberships);
      },
      (error) => {
        const toastOptions: ToastOptions = {
          message: 'Account Creation Failed',
          duration: 2000,
          position: 'top',
          styling: {
            opacity: 1,
            backgroundColor: '#e12927',
            textColor: '#FFFFFF',
            cornerRadius: 5,
            horizontalPadding: 10,
            verticalPadding: 10
          }
        }
        console.log(JSON.stringify(error));
        this.finishedLoading = true;
        this.toast.showWithOptions(toastOptions).subscribe();
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardSignups');
  }

}
