import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';
import { Storage } from '@ionic/storage';
import { UserModel } from '../../models/user-model/user.model';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


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
  public trailer = new Array<any>();
  myBtnColor = "serious";
  isFavorited: any;
  status: boolean = false;
  disabled: boolean;
  youtubeBaseUrl = "https://www.youtube.com/watch?v=";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private moviesProvider: MoviesProvider,
    private storage: Storage,
    private userModel: UserModel,
    private toastCtrl: ToastController,
    private changeDetectorRef:ChangeDetectorRef,
    private youtube: YoutubeVideoPlayer,
    public loading: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  async ionViewDidLoad() {
    //this.getParameter();
    this.parameter1 = this.navParams.get('param1'); 
    let loader = this.loading.create({
      content: 'Loading data...',
    });

    try {
      await loader.present();
      //console.log("response");
      const response  = await this.getMoviesById();
      //console.log(response.json());
      this.movie = response.json();
      //console.log("this.movie");
      //console.log(this.movie);
    }
    catch(e) {
      console.error(e);
      this.presentAlert();
    }
    finally{
      loader.dismiss();
    }

    /*loader.present().then(() => {
      this.getParameter();
      this.getMoviesById();
      this.userEmail = this.userModel.getUserMail();
      loader.dismiss();
    });*/

    /*this.getParameter();
    this.getMoviesById();
    this.userEmail = this.userModel.getUserMail();*/
  }

  getParameter(){
    this.parameter1 = this.navParams.get('param1'); 
  }

  /*getMoviesById(){
    this.moviesProvider.getMoviesById(this.parameter1).subscribe(
      (data) => {
        this.movie = data.json();
        this.changeFabColor(this.movie);
      }, error => {
        console.log("Erro detail");
      }
    )
  }*/

  getMoviesById(){
    return this.moviesProvider.getMoviesById(this.parameter1).toPromise();
  }

  async changeFabColor(movie) {
    let favoritedmovies = await this.storage.get('favoritemovies') as any[];
    if (favoritedmovies) {
      const resultado = favoritedmovies.some((favorite) => favorite.movieid == movie.id && favorite.email == this.userEmail);
      if (resultado) {
        this.disabled = true;
        this.myBtnColor = "danger";
      } else {
        this.disabled = false;
        this.myBtnColor = "serious";
      }
      this.changeDetectorRef.detectChanges();
    }  
  }

  async saveFavoriteMovie(movie){
    this.myBtnColor = "danger";
    this.changeDetectorRef.detectChanges();
    let favoritemovies = await this.storage.get('favoritemovies') as any[];
    if (favoritemovies) {
      const resultado = favoritemovies.some((favorite) => favorite.movieid == movie.id && favorite.email == this.userEmail);
      if (resultado) {
        favoritemovies = [];
        this.failToast();
      } else {
        this.favoriteMoviesPush(favoritemovies, movie);
        this.storage.set('favoritemovies', favoritemovies);
        this.sucessToast();
      }  
    } else {
      favoritemovies = [];
      this.favoriteMoviesPush(favoritemovies, movie);
      this.storage.set('favoritemovies', favoritemovies);
      this.failToast();
    }
  }  

  favoriteMoviesPush(favoritemovies, movie){
    favoritemovies.push({
      email: this.userEmail,
      movieid: movie.id,
      movietitle: movie.title,
      movieoverview: movie.overview,
      movieposter_path: movie.poster_path,
      movierelease_date: movie.release_date
    });
  }

  async isFavorite(movie){
    let favoritemovies = await this.storage.get('favoritemovies') as any[];
    if (favoritemovies) {
      const resultado = favoritemovies.some((favorite) => favorite.movieid == movie.id && favorite.email == this.userEmail);
      if (resultado) {
        this.isFavorited = true;
        this.status = true;
        return true;
      } else {
        this.isFavorited = false;
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

  getTrailerId(){
    
    //this.trailer = this.moviesProvider.getMovieTrailer(this.parameter1);
    
    this.moviesProvider.getMovieTrailer(this.parameter1).subscribe(
      (data) => {
        this.trailer = data.json().results[0].key;
        console.log(this.trailer);
      }, error => {
        console.log("Erro detail");
      }
    )
  }

  openTrailer(){
    this.getTrailerId();
    this.youtube.openVideo(this.trailer.toString());
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