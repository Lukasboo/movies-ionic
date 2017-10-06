import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AnimeProvider } from '../../providers/anime/anime';
import 'rxjs/add/operator/toPromise';
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
    private animeProvider: AnimeProvider,
    public loading: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  async ionViewDidLoad() {

    this.parameter1 = this.navParams.get('param1');
    
    let loader = this.loading.create({
      content: 'Loading data...',
    });
    
    try {
      await loader.present();
      const response  = await this.getAnimesById();
      this.anime = response.json().data;
    }
    catch(e) {
      console.error(e);
      this.presentAlert();
    }
    finally{
      loader.dismiss();
    }


    /*this.parameter1 = this.navParams.get('param1');
    console.log('ionViewDidLoad AnimesDetailPage');
    this.getAnimesById();
    console.log(this.anime);*/
  }

  getParameter(){
    this.parameter1 = this.navParams.get('param1'); 
  }

  getAnimesById(){
    return this.animeProvider.getAnimeById(this.parameter1).toPromise(); 
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
