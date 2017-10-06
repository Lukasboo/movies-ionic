import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';
import { MoviesPage } from '../movies/movies';

/**
 * Generated class for the GenresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-genres',
  templateUrl: 'genres.html',
})
export class GenresPage {

  public movies_list = new Array<any>();
  constructor(
    public navCtrl: NavController,
    private moviesProvider: MoviesProvider,
    public loading: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  async ionViewDidLoad() {
    
    let loader = this.loading.create({
      content: 'Loading data...',
    });

    /*loader.present().then(() => {
      this.getGenresMovies();
      loader.dismiss();
    });*/
  
    try {
      await loader.present();
      const response  = await this.getGenresMovies();
      //console.log(response.json().genres);
      this.movies_list = response.json().genres;
    }
    catch(e) {
      console.error(e);
      this.presentAlert();
    }
    finally{
      loader.dismiss();
    }


    //this.getGenresMovies();
  }

  onSelect(movies): void {
    this.navCtrl.push(MoviesPage, {
      param1: movies.id
    });
    
  }

  getGenresMovies(){
    return this.moviesProvider.getGenresMovies().toPromise();
  }  
  
  /*getGenresMovies(){
    this.moviesProvider.getGenresMovies().subscribe(
      (data) => {
        const { genres } = data.json();
        this.movies_list = genres;
      }, error => {
        console.log("ERROOOOOO");
      }
    )
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
