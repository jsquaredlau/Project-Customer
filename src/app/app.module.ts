import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { CardSignups } from '../pages/card-signups/card-signups';
import { Memberships } from '../pages/memberships/memberships';
import { MembershipCard } from '../pages/membership-card/membership-card';
import { MembershipCardActions } from '../pages/membership-card-actions/membership-card-actions';
import { PointConvertor } from '../pages/point-convertor/point-convertor';

import { AccountService } from '../providers/account-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    CardSignups,
    Memberships,
    MembershipCard,
    MembershipCardActions,
    PointConvertor
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    CardSignups,
    Memberships,
    MembershipCard,
    MembershipCardActions,
    PointConvertor
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AccountService
  ]
})
export class AppModule { }
