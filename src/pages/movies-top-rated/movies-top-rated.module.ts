import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesTopRatedPage } from './movies-top-rated';

@NgModule({
  declarations: [
    MoviesTopRatedPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviesTopRatedPage),
  ],
})
export class MoviesTopRatedPageModule {}
