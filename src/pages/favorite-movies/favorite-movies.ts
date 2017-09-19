import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the FavoriteMoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite-movies',
  templateUrl: 'favorite-movies.html',
})
export class FavoriteMoviesPage {

  userEmail: string;
  public movies_list = new Array<any>();
  excluir: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private loginProvider: LoginProvider,
    private alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {
    //this.movies_list = [];
    this.userEmail = this.loginProvider.getUserMail();
    console.log(this.userEmail);
    console.log("antes getFavoriteovies");
    this.getFavoriteMovies();
  }

  async getFavoriteMovies() {
    let favoritemovies = await this.storage.get('favoritemovies') as any[];
    console.log(favoritemovies);
    if (favoritemovies) {
      this.movies_list = await favoritemovies.filter((movie) => movie.email = this.userEmail);
      console.log(this.movies_list);
    }
  }

  async removeMovie(movie) {
    //this.presentConfirm();
    let favoritemovies = await this.storage.get('favoritemovies') as any[];
    favoritemovies = favoritemovies.filter((filme) => filme.movieid !== movie.movieid);
    console.log("antes de set");
    console.log(favoritemovies);
    await this.storage.set('favoritemovies', favoritemovies);
    this.ionViewDidLoad();
  }

  presentConfirm(movie) {
    let alert = this.alertCtrl.create({
      title: 'Exclusão',
      message: 'Deseja excluir esse filme dos seus Favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.excluir = false;
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.removeMovie(movie);
            //this.ionViewDidLoad();
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  /*async removeMovie(movie){
    let favoritemovies = await this.storage.get('favoritemovies') as any[];
    favoritemovies = favoritemovies.filter((filme) => filme.movieid !== movie.movieid);
    console.log("antes de set");
    console.log(favoritemovies);
    this.storage.set('favoritemovies', favoritemovies); 
  }

  presentConfirm(movie) {
    let alert = this.alertCtrl.create({
      title: 'Exclusão',
      message: 'Deseja excluir esse filme dos seus Favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.removeMovie(movie);
            this.ionViewDidLoad();
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }*/


}
