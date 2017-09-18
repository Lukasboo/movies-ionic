import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private loginProvider: LoginProvider
    ) {
  }

  ionViewDidLoad() {
    this.userEmail = this.loginProvider.getUserMail();
    console.log(this.userEmail);
    console.log("antes getFavoriteovies");
    this.getFavoriteMovies();
  }

  async getFavoriteMovies(){
    let favoritemovies = await this.storage.get('favoritemovies') as any[];
    if (favoritemovies) {
      const resultado = favoritemovies.some((favorite) => favorite.email == this.userEmail);
      if(resultado){
        for (let favorites of favoritemovies) {
          if(favorites.email == this.userEmail){
            this.movies_list.push(favorites);
          }
        }
        console.log(this.movies_list);
      } 
    }  
  }
}
