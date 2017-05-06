import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { CardSignups } from '../pages/card-signups/card-signups';
import { Memberships } from '../pages/memberships/memberships';
import { MembershipCard } from '../pages/membership-card/membership-card';
import { MembershipCardActions } from '../pages/membership-card-actions/membership-card-actions';
import { PointConvertor } from '../pages/point-convertor/point-convertor';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PointConvertor;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Login', component: Login },
      { title: 'Card Signups', component: CardSignups },
      { title: 'Memberships', component: Memberships },
      { title: 'Membership Card', component: MembershipCard },
      { title: 'Membership Card Actions', component: MembershipCardActions },
      { title: 'Point Convertor', component: PointConvertor }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
