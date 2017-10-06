import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MoviedetailPage } from '../moviedetail/moviedetail';
import { MoviesProvider } from '../../providers/movies/movies';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the MoviesUpcomingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movies-upcoming',
  templateUrl: 'movies-upcoming.html',
})
export class MoviesUpcomingPage {

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

    try {
      await loader.present();
      console.log("response");
      const response  = await this.getMoviesUpcoming();
      //console.log(response.json());
      this.movies_list = response.json().results;
      //console.log("this.movies_list");
      //console.log(this.movies_list);
    }
    catch(e) {
      console.error(e);
      this.presentAlert();
      
    }
    finally{
      loader.dismiss();
    }

    /*loader.present().then(() => {
      this.getMoviesUpcoming();
      loader.dismiss();
    });*/

      //this.getMoviesUpcoming();
  }

  onSelect(movies): void {
    this.navCtrl.push(MoviedetailPage, {
      param1: movies.id
    });
  }

  getMoviesUpcoming(){
    return this.moviesProvider.getMoviesUpcoming().toPromise();
  }

  /*async getMoviesUpcoming() {
    //this.parameter1 = this.navParams.get('param1');
    this.movies_list = this.moviesProvider.getMoviesUpcoming()
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
