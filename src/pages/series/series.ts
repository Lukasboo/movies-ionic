import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { SeriesDetailPage } from '../series-detail/series-detail';
import { SeriesProvider } from '../../providers/series/series';

/**
 * Generated class for the SeriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-series',
  templateUrl: 'series.html',
})
export class SeriesPage {

  public series_list: Observable<any>;
  parameter1: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private seriesProvider: SeriesProvider,
    public loading: LoadingController,
    public alertCtrl: AlertController
    ) {
  }

  async ionViewDidLoad() {
    
    let loader = this.loading.create({
      content: 'Loading data...',
    });

    /*loader.present().then(() => {
      this.getSeries();
      loader.dismiss();
    });*/

    try{
      await loader.present();
      const response = await this.getSeries();
      this.series_list = response.json().results;
      console.log(response.json().results);
    }
    catch(e){
      console.log(e);
      this.presentAlert();
    }
    finally{
      loader.dismiss();
    }

    /*try {
      await loader.present();
      console.log("response");
      const response  = await this.getMoviesUpcoming();
      //console.log(response.json());
      this.movies_list = response.json().results;
      //console.log("this.movies_list");
      //console.log(this.movies_list);
    }
    catch(e) {
      console.error(e);
    }
    finally{
      loader.dismiss();
    }*/

    
    //this.getMoviesByGenre();
     
  }

  onSelect(series): void {
    this.navCtrl.push(SeriesDetailPage, {
      param1: series.id
    });
  }

  getSeries(){
    return this.seriesProvider.getSeries().toPromise();
  }
  /*async getMoviesByGenre() {
    this.parameter1 = this.navParams.get('param1');
    this.series_list = this.seriesProvider.getSeries()
      .do((response) => console.log(response.json()))
      .map((response) => response.json())
      .map((response) => response.results);
  }*/

  presentAlert() {
    const alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: 'Ocorreu algum erro, verifique sua conexão e tente novamente!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
