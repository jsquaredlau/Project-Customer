import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardSignups } from './card-signups';

@NgModule({
  declarations: [
    CardSignups,
  ],
  imports: [
    IonicPageModule.forChild(CardSignups),
  ],
  exports: [
    CardSignups
  ]
})
export class CardSignupsModule {}
