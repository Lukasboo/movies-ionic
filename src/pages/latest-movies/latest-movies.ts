import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { MoviesProvider } from '../../providers/movies/movies';
import { MoviedetailPage } from '../moviedetail/moviedetail';

/**
 * Generated class for the LatestMoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-latest-movies',
  templateUrl: 'latest-movies.html',
})
export class LatestMoviesPage {

  public movies_list: Observable<any>;
  parameter1: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private moviesProvider: MoviesProvider,
    public loading: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  async ionViewDidLoad() {
    let loader = this.loading.create({
      content: 'Loading data...',
    });

    try{
      await loader.present();
      var response = await this.getLatestMovies();
      this.movies_list = response.json().results;
      console.log(this.movies_list);
    } catch(e){
      console.log(e);
      this.presentAlert();
    }  finally {
      loader.dismiss();
    }
    /*loader.present().then(() => {
      this.getLatestMovies();
      loader.dismiss();
    });*/
  
      //this.getLatestMovies();
  }

  onSelect(movies): void {
    this.navCtrl.push(MoviedetailPage, {
      param1: movies.id
    });
  }

  getLatestMovies() {
    return this.moviesProvider.getLatestMovies().toPromise();
  }

  /*async getLatestMovies() {
    //this.parameter1 = this.navParams.get('param1');
    this.movies_list = this.moviesProvider.getLatestMovies()
      .do((response) => console.log(response.json()))
      .map((response) => response.json())
      .map((response) => response.results);
  }*/

  presentAlert() {
    const alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: 'Ocorreu algum erro, verifique sua conexão e tente novamente!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
