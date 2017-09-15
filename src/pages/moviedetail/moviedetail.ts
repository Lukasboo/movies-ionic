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
    // console.log(this.movie.id)
    let favoritemovie = await this.storage.get('favoritemovie') as any[];
    const resultado = favoritemovie.some((favorite) => favorite.email == movie.id && favorite.movieid == this.userEmail);
    if (!resultado) {
      favoritemovie = [];
      this.failToast();
    } else {
      favoritemovie.push({
        email: this.userEmail,
        movieid: movie.id
      });
      this.storage.set('favoritemovie', favoritemovie);
      console.log("MOSTRANDO  favorite");
      console.log(favoritemovie);
      this.sucessToast();
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
