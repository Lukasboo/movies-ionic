import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeriesDetailPage } from './series-detail';

@NgModule({
  declarations: [
    SeriesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SeriesDetailPage),
  ],
})
export class SeriesDetailPageModule {}
