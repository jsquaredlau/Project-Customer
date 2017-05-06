import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembershipCard } from './membership-card';

@NgModule({
  declarations: [
    MembershipCard,
  ],
  imports: [
    IonicPageModule.forChild(MembershipCard),
  ],
  exports: [
    MembershipCard
  ]
})
export class MembershipCardModule {}
