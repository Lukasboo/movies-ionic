import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimesDetailPage } from './animes-detail';

@NgModule({
  declarations: [
    AnimesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimesDetailPage),
  ],
})
export class AnimesDetailPageModule {}
