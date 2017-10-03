import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';
import { MoviesPage } from '../movies/movies';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public movies_list = new Array<any>();
  constructor(
    public navCtrl: NavController,
    private moviesProvider: MoviesProvider
  ) {
  }

  ionViewDidLoad() {
    this.getGenresMovies();
  }

  onSelect(movies): void {
    this.navCtrl.push(MoviesPage, {
      param1: movies.id
    });
    
  }

  getGenresMovies(){
    this.moviesProvider.getGenresMovies().subscribe(
      (data) => {
        const { genres } = data.json();
        this.movies_list = genres;
      }, error => {
        console.log("ERROOOOOO");
      }
    )
  }

}
