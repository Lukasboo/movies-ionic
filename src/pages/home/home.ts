import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GenresPage } from '../genres/genres';
import { LatestMoviesPage } from '../latest-movies/latest-movies';
import { MoviesTopRatedPage } from '../movies-top-rated/movies-top-rated';
import { MoviesUpcomingPage } from '../movies-upcoming/movies-upcoming';
import { FavoriteMoviesPage } from '../favorite-movies/favorite-movies';
import { SeriesPage } from '../series/series';
import { AnimesPage } from '../animes/animes';
import { SettingsPage } from '../settings/settings';
import { AccountPage } from '../account/account';
  
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public movies_list = new Array<any>();
  pages: Array<{title: string, component: any}>;
  tab1Root: any = HomePage;
  tab2Root: any = SettingsPage;
  tab3Root: any = AccountPage;


  constructor(
    public navCtrl: NavController
  ) {
    
  }

  ionViewDidLoad() {
    
  }

  goToHomePage(){
    this.navCtrl.setRoot(HomePage);
  }

  goToGenresPage(){
    this.navCtrl.push(GenresPage);
  }

  goToLatestPage(){
    this.navCtrl.push(LatestMoviesPage);
  }

  goToTopRatedPage(){
    this.navCtrl.push(MoviesTopRatedPage);
  }

  goUpcomingPage(){
    this.navCtrl.push(MoviesUpcomingPage);
  }

  goFavoritesPage(){
    this.navCtrl.push(FavoriteMoviesPage);
  }

  goSeriesPage(){
    this.navCtrl.push(SeriesPage);
  }

  goAnimesPage(){
    this.navCtrl.push(AnimesPage);
  }

  goLogOut(){
    window.location.reload();
  }

}
