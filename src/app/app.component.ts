import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from "../pages/home/home";
import { MoviesPage } from "../pages/movies/movies";
import { FavoriteMoviesPage } from "../pages/favorite-movies/favorite-movies";
import { LatestMoviesPage } from '../pages/latest-movies/latest-movies';
import { MoviesTopRatedPage } from '../pages/movies-top-rated/movies-top-rated';
import { MoviesUpcomingPage } from '../pages/movies-upcoming/movies-upcoming';
import { SeriesPage } from '../pages/series/series';
import { AnimesPage } from '../pages/animes/animes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any, icon: string}>;
  userName: string;
  userEmail: string;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public events: Events
  ) {
    this.initializeApp();

    events.subscribe('user:login', (userName, userEmail) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.userName = userName;
      this.userEmail = userEmail;
      console.log('Welcome', userName);
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Gêneros', component: HomePage, icon: "ios-browsers-outline" },
      { title: 'Últimos Adicionados', component: LatestMoviesPage, icon: "ios-calendar-outline" },
      { title: 'Mais Votados', component: MoviesTopRatedPage, icon: "ios-thumbs-up-outline" },
      { title: 'Estréia', component: MoviesUpcomingPage, icon: "ios-videocam-outline" },
      { title: 'Favoritos', component: FavoriteMoviesPage, icon: "ios-star-outline" },
      { title: 'Series', component: SeriesPage, icon: "ios-flash-outline" },
      { title: 'Animes', component: AnimesPage, icon: "ios-flash-outline" },
      { title: 'Sair', component: LoginPage, icon: "ios-log-out-outline" }
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}

