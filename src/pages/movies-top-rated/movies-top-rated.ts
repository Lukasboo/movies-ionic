import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { MoviesProvider } from '../../providers/movies/movies';
import { MoviedetailPage } from '../moviedetail/moviedetail';

/**
 * Generated class for the MoviesTopRatedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movies-top-rated',
  templateUrl: 'movies-top-rated.html',
})
export class MoviesTopRatedPage {

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
      this.getMoviesTopRated();
      loader.dismiss();
    });*/

    try {
      await loader.present();
      //console.log("response");
      const response  = await this.getMoviesTopRated();
      //console.log(response.json());
      this.movies_list = response.json().results;
      /*console.log("this.movies_list");
      console.log(this.movies_list);*/
    }
    catch(e) {
      console.error(e);
      this.presentAlert();
    }
    finally{
      loader.dismiss();
    }


    //this.getMoviesTopRated();
  }

  onSelect(movies): void {
    this.navCtrl.push(MoviedetailPage, {
      param1: movies.id
    });
  }

  getMoviesTopRated(){
    return this.moviesProvider.getMoviesTopRated().toPromise();
  }

  /*async getMoviesTopRated() {
    //this.parameter1 = this.navParams.get('param1');
    this.movies_list = this.moviesProvider.getMoviesTopRated()
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
