import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';
import { MoviesPage } from '../movies/movies';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    MoviesProvider
  ]
})
export class HomePage {
  public movies_list = new Array<any>();
  constructor(
    public navCtrl: NavController,
    private moviesProvider: MoviesProvider
  ) {
  }

  ionViewDidLoad() {
    //this.navCtrl.setRoot(HomePage);
    this.moviesProvider.getGenresMovies().subscribe(
      (data) => {
        const { genres } = data.json();
        this.movies_list = genres;
      }, error => {
        console.log("ERROOOOOO");
      }
    )
  }

  onSelect(movies): void {
    console.log(movies);
    this.navCtrl.push(MoviesPage, {
      param1: movies.id, param2: movies.name
    });
  }

}
