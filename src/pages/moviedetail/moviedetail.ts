import { Component, ChangeDetectorRef } from '@angular/core';
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
  
  fabfavorite: any;
  parameter1: number;
  movieid: string;
  userEmail: string;
  public movie = new Array<any>();
  myBtnColor = "primary";
  status: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private moviesProvider: MoviesProvider,
    private storage: Storage,
    private loginProvider: LoginProvider,
    private toastCtrl: ToastController,
    private changeDetectorRef:ChangeDetectorRef
  ) {
  }

  ionViewDidLoad() {
    console.log("MOVIE DETAIL PAGE ");
    this.parameter1 = this.navParams.get('param1'); 
    this.moviesProvider.getMoviesById(this.parameter1).subscribe(
      (data) => {
        this.movie = data.json();
        //console.log("antes de changefab");
        //console.log(this.movie);
        this.changeFabColor(this.movie);
        /*console.log(this.loginProvider.getUserMail());
        console.log("apos data json");
        console.log(this.movie);*/
      }, error => {
        console.log("Erro detail");
      }
    )
    this.userEmail = this.loginProvider.getUserMail();
    //console.log("email global");
    //console.log(this.userEmail);
    //this.myBtnColor = "danger";
    //this.changeDetectorRef.detectChanges();
    
      //let favoritedmovies = await this.storage.get('favoritemovies') as any[];
      /*if (favoritedmovies) {
        console.log();
        this.myBtnColor = "danger";
        this.changeDetectorRef.detectChanges();
      } else {
        this.myBtnColor = "primary";
        this.changeDetectorRef.detectChanges();
      }*/
      /*console.log("antes de change fab");
      console.log(this.movie);
      this.changeFabColor(this.movie);*/

  }

  async changeFabColor(movie) {
    console.log("movie");
    console.log(movie);
    console.log("movieid");
    console.log(this.movieid);
    let favoritedmovies = await this.storage.get('favoritemovies') as any[];
    console.log("favoritedmovies");
    console.log(favoritedmovies);
    if (favoritedmovies) {
      const resultado = favoritedmovies.some(
        (favorite) => favorite.movieid == movie.id && 
        favorite.email == this.userEmail
      );
      /*console.log("movieid");
      console.log(movie.id);
      console.log("userEmail");
      console.log(this.userEmail);
      console.log("resultado");
      console.log(resultado);*/
      if (resultado) {
        console.log("primary color");
        this.myBtnColor = "danger";
        this.changeDetectorRef.detectChanges();
      } else {
        console.log("danger color");
        this.myBtnColor = "primary";
        this.changeDetectorRef.detectChanges();
      }
    }  

  }

  async saveFavoriteMovie(movie){
    /*console.log(this.userEmail);
    console.log(movie.id);
    console.log(movie.title);
    console.log(movie.overview);
    console.log(movie.poster_path);*/
    this.myBtnColor = "danger";
    this.changeDetectorRef.detectChanges();
    let favoritemovies = await this.storage.get('favoritemovies') as any[];
    if (favoritemovies) {
      const resultado = favoritemovies.some((favorite) => favorite.movieid == movie.id && favorite.email == this.userEmail);
      if (resultado) {
        console.log("fail toast");
        favoritemovies = [];
        this.failToast();
      } else {
        favoritemovies.push({
          email: this.userEmail,
          movieid: movie.id,
          movietitle: movie.title,
          movieoverview: movie.overview,
          movieposter_path: movie.poster_path
        });
        this.storage.set('favoritemovies', favoritemovies);
        console.log(favoritemovies);
        this.sucessToast();
      }  
    } else {
      favoritemovies = [];
      /*console.log(favoritemovies);
      console.log("informações filme e email usuario");
      console.log(this.userEmail);
      console.log(movie.id);
      console.log(movie.title);
      console.log(movie.overview);
      console.log(movie.poster_path);*/
      favoritemovies.push({
        email: this.userEmail,
        movieid: movie.id,
        movietitle: movie.title,
        movieoverview: movie.overview,
        movieposter_path: movie.poster_path
      });
      this.storage.set('favoritemovies', favoritemovies);
      console.log(favoritemovies);
      this.failToast();
    }
    
  }  

  async isFavorite(movie){
    let favoritemovies = await this.storage.get('favoritemovies') as any[];
    if (favoritemovies) {
      const resultado = favoritemovies.some((favorite) => favorite.movieid == movie.id && favorite.email == this.userEmail);
      if (resultado) {
        this.status = true;
        return true;
      } else {
        this.status = false;
        return false;  
      }
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