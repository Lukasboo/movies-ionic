import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserModel } from '../../models/user-model/user.model';

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
    private userModel: UserModel,
    private alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {
    this.userEmail = this.userModel.getUserMail();
    this.getFavoriteMovies();
  }

  async getFavoriteMovies() {
    let favoritemovies = await this.storage.get('favoritemovies') as any[];
    if (favoritemovies) {
      this.movies_list = await favoritemovies.filter((movie) => movie.email == this.userEmail);
    }
  }

  async removeMovie(movie) {
    let favoritemovies = await this.storage.get('favoritemovies') as any[];
    favoritemovies = favoritemovies.filter((filme) => filme.movieid !== movie.movieid);
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
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.removeMovie(movie);
          }
        }
      ]
    });
    alert.present();
  }
}
