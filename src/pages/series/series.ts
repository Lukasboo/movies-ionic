import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    private seriesProvider: SeriesProvider
    ) {
  }

  ionViewDidLoad() {
    var parametro = this.navParams.get('param1');

    if(parametro === "latest"){
      
    } else {
      this.getMoviesByGenre();
    } 
  }

  onSelect(series): void {
    this.navCtrl.push(SeriesDetailPage, {
      param1: series.id
    });
  }

  async getMoviesByGenre() {
    this.parameter1 = this.navParams.get('param1');
    this.series_list = this.seriesProvider.getSeries()
      .do((response) => console.log(response.json()))
      .map((response) => response.json())
      .map((response) => response.results);
  }

  

}
