import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from "../pages/home/home";
import { FavoriteMoviesPage } from "../pages/favorite-movies/favorite-movies";
import { UserModel } from '../models/user-model/user.model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any}>;
  userName: string;
  userEmail: string;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    private userModel: UserModel,
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
      { title: 'Gêneros', component: HomePage },
      { title: 'Favoritos', component: FavoriteMoviesPage },
      { title: 'Sair', component: LoginPage }
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    //this.userName = this.userModel.getUserName();
    //console.log("app component username");
    //console.log(this.userName);
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

