import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';
import { MoviedetailPage } from '../moviedetail/moviedetail';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
/**
 * Generated class for the MoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html'
})
export class MoviesPage {

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
    this.parameter1 = this.navParams.get('param1');
    let loader = this.loading.create({
      content: 'Loading data...',
    });

    /*loader.present().then(() => {
      var parametro = this.navParams.get('param1');
      this.getMoviesByGenre();
      loader.dismiss();
    });*/

    try {
      await loader.present();
      const response  = await this.getMoviesByGenre();
      console.log(response.json().results);
      this.movies_list = response.json().results;
    }
    catch(e) {
      console.error(e);
      this.presentAlert();
    }
    finally{
      loader.dismiss();
    }


    /*var parametro = this.navParams.get('param1');
    this.getMoviesByGenre(); */
  }

  onSelect(movies): void {
    this.navCtrl.push(MoviedetailPage, {
      param1: movies.id
    });
  }

  /*async getMoviesByGenre() {
    this.parameter1 = this.navParams.get('param1');
    this.movies_list = this.moviesProvider.getMoviesByGenre(this.parameter1)
      .do((response) => console.log(response.json()))
      .map((response) => response.json())
      .map((response) => response.results);
  }*/

  getMoviesByGenre(){
    return this.moviesProvider.getMoviesByGenre(this.parameter1).toPromise();
  }

  presentAlert() {
    const alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: 'Ocorreu algum erro, verifique sua conexão e tente novamente!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
