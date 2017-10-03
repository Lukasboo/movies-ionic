import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SeriesProvider } from '../../providers/series/series';
import { UserModel } from '../../models/user-model/user.model';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SeriesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-series-detail',
  templateUrl: 'series-detail.html',
})

export class SeriesDetailPage {

  parameter1: number;
  public serie = new Array<any>();
  myBtnColor = "serious";
  disabled: boolean;
  userEmail: string;
  isFavorited: any;
  status: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private seriesProvider: SeriesProvider,
    private changeDetectorRef: ChangeDetectorRef,
    private userModel: UserModel,
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    this.getParameter();
    this.getSeriesById();
    this.userEmail = this.userModel.getUserMail();
    
    console.log('ionViewDidLoad SeriesDetailPage');
  }

  getParameter(){
    this.parameter1 = this.navParams.get('param1'); 
  }

  getSeriesById(){
    this.seriesProvider.getSeriesById(this.parameter1).subscribe(
      (data) => {
        this.serie = data.json();
        this.changeFabColor(this.serie);
      }, error => {
        console.log("Erro detail");
      }
    )
  }

  async saveFavoriteMovie(serie){
    this.myBtnColor = "danger";
    this.changeDetectorRef.detectChanges();
    let favoritemovies = await this.storage.get('favoritemovies') as any[];
    if (favoritemovies) {
      const resultado = favoritemovies.some((favorite) => favorite.movieid == serie.id && favorite.email == this.userEmail);
      if (resultado) {
        favoritemovies = [];
        this.failToast();
      } else {
        this.favoriteMoviesPush(favoritemovies, serie);
        this.storage.set('favoritemovies', favoritemovies);
        this.sucessToast();
      }  
    } else {
      favoritemovies = [];
      this.favoriteMoviesPush(favoritemovies, serie);
      this.storage.set('favoritemovies', favoritemovies);
      this.failToast();
    }
  }  

  favoriteMoviesPush(favoritemovies, serie){
    favoritemovies.push({
      email: this.userEmail,
      movieid: serie.id,
      movietitle: serie.name,
      movieoverview: serie.overview,
      movieposter_path: serie.poster_path,
      movierelease_date: serie.first_air_date
    });
  }

  async changeFabColor(serie) {
    let favoritedmovies = await this.storage.get('favoritemovies') as any[];
    if (favoritedmovies) {
      const resultado = favoritedmovies.some((favorite) => favorite.movieid == serie.id && favorite.email == this.userEmail);
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

  async isFavorite(serie){
    let favoritemovies = await this.storage.get('favoritemovies') as any[];
    if (favoritemovies) {
      const resultado = favoritemovies.some((favorite) => favorite.movied == serie.id && favorite.email == this.userEmail);
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

}
