import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimeProvider } from '../../providers/anime/anime';

/**
 * Generated class for the AnimesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-animes-detail',
  templateUrl: 'animes-detail.html',
})
export class AnimesDetailPage {

  parameter1: any;
  //public anime = new Array<any>();
  public anime: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private animeProvider: AnimeProvider
  ) {
  }

  ionViewDidLoad() {
    this.parameter1 = this.navParams.get('param1');
    console.log('ionViewDidLoad AnimesDetailPage');
    this.getAnimesById();
    console.log(this.anime);
  }

  getParameter(){
    this.parameter1 = this.navParams.get('param1'); 
  }

  async getAnimesById(){
    await this.animeProvider.getAnimeById(this.parameter1).subscribe(
      (data) => {
        this.anime = data.json().data;
        //console.log(this.anime);
        //this.changeFabColor(this.movie);
      }, error => {
        console.log("Erro detail");
      }
    )
  }

}
