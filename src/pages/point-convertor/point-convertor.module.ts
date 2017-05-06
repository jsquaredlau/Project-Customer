import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointConvertor } from './point-convertor';

@NgModule({
  declarations: [
    PointConvertor,
  ],
  imports: [
    IonicPageModule.forChild(PointConvertor),
  ],
  exports: [
    PointConvertor
  ]
})
export class PointConvertorModule {}
