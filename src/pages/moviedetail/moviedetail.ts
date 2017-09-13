import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoviesProvider } from '../../providers/movies/movies';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MoviedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-moviedetail',
  templateUrl: 'moviedetail.html',
  providers: [
    MoviesProvider
  ]
})
export class MoviedetailPage {
  toastCtrl: any;

  parameter1: number;
  movieid: string;
  public movie = new Array<any>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private moviesProvider: MoviesProvider,
    private storage: Storage
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MoviedetailPage');
    this.parameter1 = this.navParams.get('param1'); 
    // console.log(this.parameter1);
    this.moviesProvider.getMoviesById(this.parameter1).subscribe(
      (data) => {
        this.movie = data.json();
        
        console.log(this.movie);
      }, error => {
        console.log("ERROOOOOO");
      }
    )
  }

  async saveFavoriteMovie(){
    // console.log(this.movie.id)
    let favoritemovie = await this.storage.get('favoritemovie') as any[];
    if (!favoritemovie) {
      favoritemovie = [];
    }
    favoritemovie.push({
      //email: this.movie.emaild,
      // movieid: this.movie.id;
    });
    this.storage.set('movies', favoritemovie);
    // console.log(favoritemovie);
    this.sucessToast();
  }  

  sucessToast() {
    let toast = this.toastCtrl.create({
      message: 'Usuário adicionado com sucesso!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  

}
