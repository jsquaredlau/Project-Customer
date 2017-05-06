import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembershipCardActions } from './membership-card-actions';

@NgModule({
  declarations: [
    MembershipCardActions,
  ],
  imports: [
    IonicPageModule.forChild(MembershipCardActions),
  ],
  exports: [
    MembershipCardActions
  ]
})
export class MembershipCardActionsModule {}
