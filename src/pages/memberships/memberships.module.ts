import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Memberships } from './memberships';

@NgModule({
  declarations: [
    Memberships,
  ],
  imports: [
    IonicPageModule.forChild(Memberships),
  ],
  exports: [
    Memberships
  ]
})
export class MembershipsModule {}
