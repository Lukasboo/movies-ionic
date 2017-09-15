import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
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
import { LoginProvider } from '../providers/login/login';
import { FavoriteMoviesPage } from "../pages/favorite-movies/favorite-movies";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MoviesPage,
    MoviedetailPage,
    FavoriteMoviesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    FavoriteMoviesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MoviesProvider,
    LoginProvider
  ]
})
export class AppModule {}
