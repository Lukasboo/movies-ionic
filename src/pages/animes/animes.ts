import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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
    private animeProvider: AnimeProvider,
    public loading: LoadingController,
    public alertCtrl: AlertController
    ) {
  }

  async ionViewDidLoad() {

    let loader = this.loading.create({
      content: 'Loading data...',
    });

    loader.present().then(() => {
      this.getAnimes();
      loader.dismiss();
    });

    try {
      await loader.present();
      const response  = await this.getAnimes();
      var count = Object.keys(response.json().data).length;
      for(let i=0; i<count; i++){    
        this.animes_list.push(response.json().data[i]);
      }
    }
    catch(e) {
      console.error(e);
      this.presentAlert();
    }
    finally{
      loader.dismiss();
    }

    //this.getAnimes();
    
  }

  /*async getAnimes() {
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
  }*/
  getAnimes() {
    return this.animeProvider.getAnimes().toPromise(); 
  }  

  onSelect(anime): void {
    this.navCtrl.push(AnimesDetailPage, {
      param1: anime.id
    });
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
