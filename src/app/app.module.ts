import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MoviesProvider } from '../providers/movies/movies';
import { MoviesPage } from '../pages/movies/movies';
import { MoviedetailPage } from '../pages/moviedetail/moviedetail';
import { HttpModule } from '@angular/http';
import { FavoriteMoviesPage } from "../pages/favorite-movies/favorite-movies";
import { UserModel } from '../models/user-model/user.model';
import { LoginProvider } from '../providers/login/login';
import { LatestMoviesPage } from '../pages/latest-movies/latest-movies';
import { MoviesTopRatedPage } from '../pages/movies-top-rated/movies-top-rated';
import { MoviesUpcomingPage } from '../pages/movies-upcoming/movies-upcoming';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { SeriesProvider } from '../providers/series/series';
import { SeriesPage } from '../pages/series/series';
import { SeriesDetailPage } from '../pages/series-detail/series-detail';
import { AnimeProvider } from '../providers/anime/anime';
import { AuthHttpProvider } from '../providers/anime/auth-http';
import { AnimesPage } from '../pages/animes/animes';
import { AnimesDetailPage } from '../pages/animes-detail/animes-detail';
import { GenresPage } from '../pages/genres/genres';
import { SettingsPage } from '../pages/settings/settings';
import { AccountPage } from '../pages/account/account';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MoviesPage,
    MoviedetailPage,
    FavoriteMoviesPage,
    LatestMoviesPage,
    MoviesTopRatedPage,
    MoviesUpcomingPage,
    SeriesPage,
    SeriesDetailPage,
    AnimesPage,
    AnimesDetailPage,
    GenresPage,
    SettingsPage,
    AccountPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxQRCodeModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MoviesPage,
    MoviedetailPage,
    FavoriteMoviesPage,
    LatestMoviesPage,
    MoviesTopRatedPage,
    MoviesUpcomingPage,
    SeriesPage,
    SeriesDetailPage,
    AnimesPage,
    AnimesDetailPage,
    GenresPage,
    SettingsPage,
    AccountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MoviesProvider,
    UserModel,
    LoginProvider,
    YoutubeVideoPlayer,
    SeriesProvider,
    AnimeProvider,
    AuthHttpProvider,
    BarcodeScanner
  ]
})
export class AppModule {}
