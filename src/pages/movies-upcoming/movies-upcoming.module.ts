import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesUpcomingPage } from './movies-upcoming';

@NgModule({
  declarations: [
    MoviesUpcomingPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviesUpcomingPage),
  ],
})
export class MoviesUpcomingPageModule {}
