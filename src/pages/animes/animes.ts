import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnimeProvider } from '../../providers/anime/anime';
import { Observable } from 'rxjs/Observable';
import { AnimesDetailPage } from '../animes-detail/animes-detail';

/**
 * Generated class for the AnimesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-animes',
  templateUrl: 'animes.html',
})
export class AnimesPage {

  //public animes_list: Observable<any>;
  public animes_list = new Array<any>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private animeProvider: AnimeProvider
    ) {
  }

  ionViewDidLoad() {
    this.getAnimes();
    console.log(this.animes_list);
  }

  async getAnimes() {
    await this.animeProvider.getAnimes().subscribe(
      (data) => {
        var count = Object.keys(data.json().data).length;
        for(let i=0; i<count; i++){    
          this.animes_list.push(data.json().data[i]);
        }  
      }, error => {
        console.log("ERROOOOOO");
      }
    )
    console.log(this.animes_list);
  }

  onSelect(anime): void {
    this.navCtrl.push(AnimesDetailPage, {
      param1: anime.id
    });
  }

}
