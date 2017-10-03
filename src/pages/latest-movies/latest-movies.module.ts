import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LatestMoviesPage } from './latest-movies';

@NgModule({
  declarations: [
    LatestMoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(LatestMoviesPage),
  ],
})
export class LatestMoviesPageModule {}
