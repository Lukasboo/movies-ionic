import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';
import { Storage } from '@ionic/storage';
import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the MoviedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-moviedetail',
  templateUrl: 'moviedetail.html'
})
export class MoviedetailPage {
  
  parameter1: number;
  movieid: string;
  userEmail: string;
  public movie = new Array<any>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private moviesProvider: MoviesProvider,
    private storage: Storage,
    private loginProvider: LoginProvider,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    this.parameter1 = this.navParams.get('param1'); 
    this.moviesProvider.getMoviesById(this.parameter1).subscribe(
      (data) => {
        this.movie = data.json();
        console.log(this.loginProvider.getUserMail());
        console.log(this.movie);
      }, error => {
        console.log("Erro detail");
      }
    )
    this.userEmail = this.loginProvider.getUserMail();
  }

  async saveFavoriteMovie(movie){

    let favoritemovies = await this.storage.get('favoritemovies') as any[];
    if (favoritemovies) {
      
      const resultado = favoritemovies.some((favorite) => favorite.movieid == movie.id && favorite.email == this.userEmail);

      console.log(resultado);
      console.log(movie.id);
      console.log(this.userEmail);


      if (resultado) {
        favoritemovies = [];
        this.failToast();
      } else {
        favoritemovies.push({
          email: this.userEmail,
          movieid: movie.id,
        });
        this.storage.set('favoritemovies', favoritemovies);
        console.log(favoritemovies);
        this.sucessToast();
      }  
    } else {
      favoritemovies.push({
        email: this.userEmail,
        movieid: movie.id
      });
    }

   

  }  

  sucessToast() {
    let toast = this.toastCtrl.create({
      message: 'Filme adicionado aos favoritos com sucesso!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  
  failToast() {
    let toast = this.toastCtrl.create({
      message: 'Este filme já está adicionado nos seus Favoritos!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}