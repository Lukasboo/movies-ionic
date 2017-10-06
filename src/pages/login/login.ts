import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { UserModel } from '../../models/user-model/user.model';
import { LoginProvider } from '../../providers/login/login';
import { AnimeProvider } from '../../providers/anime/anime';
import { MoviesProvider } from '../../providers/movies/movies';
import 'rxjs/add/operator/toPromise';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
  //providers: [AnimeProvider],
  
})
export class LoginPage {
  
  public email: string;
  public password: string;
  inputEmail: string;
  inputPassword: string;
  user: any;
  type= "password";
  show = false;
  loginValid: string;
  animes:any;
  qrData = null;
  createdCode = null;
  scannedCode = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private toastCtrl: ToastController,
    private userModel: UserModel,
    public events: Events,
    public loadingCtrl: LoadingController,
    private loginProvider: LoginProvider,
    private animeProvider: AnimeProvider,
    private moviesProvider: MoviesProvider,
    private barcodeScanner: BarcodeScanner
  ) {
    this.animes = [];
    /*animeProvider.registerUser();
    console.log(animeProvider.registerUser());*/
  }

  goToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  goToHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  logout() {
    window.location.reload;
    //this.userModel.setUserMail("");
    //this.navCtrl.setRoot(LoginPage);
  }

  async login() {
    /*console.log("login print");
    console.log(this.loginProvider.loginValidate());*/

    /*this.moviesProvider.getAnim().subscribe(
      .do((response) => console.log(response.json()))
      .map((response) => response.json())
      .map((response) => response.results);*/
      
    /*await this.moviesProvider.getAnim().subscribe(
      (data) => {
        console.log("data print");
        console.log(data.json());*/
        //this.loginValid = data.json().resp;
        //console.log("login valid = " + this.loginValid);

        /*if(this.loginValid === "true"){
          this.setUserData();
          this.publishLoginEvent();
          this.presentLoading();
        } else {
          this.userToast();
        }*/
      /*}, error => {
        console.log(error);
      }
    )*/

    /*this.loginProvider.loginValidate(this.inputEmail, this.inputPassword).subscribe(
      (data) => {
        console.log("data print");
        console.log(data.json().resp);
        this.loginValid = data.json().resp;
        console.log("login valid = " + this.loginValid);

        if(this.loginValid === "true"){
          this.setUserData();
          this.publishLoginEvent();
          this.presentLoading();
        } else {
          this.userToast();
        }
      }, error => {
        console.log(error);
      }
    )*/
   
  //}

  //console.log("register user");
  //console.log(this.animeProvider.getTest().then(obs => obs.subscribe(dado=> console.log(dado))));
  /*var teste = await this.moviesProvider.getAnim()
  .do((response) => console.log(response.json()))
  .map((response) => response.json())
  .map((response) => response.results);*/

  
   

  /*this.animeProvider.registerUser()
  .then((response) => console.log(response.json()))
  .catch((erro) => console.log(erro.json()));*/

    const usuarios = await this.storage.get('usuarios') as any[];
    if(usuarios) {
      const resultado = usuarios.some((usuario) => usuario.email == this.inputEmail && usuario.password == this.inputPassword);
      if (resultado) {
        this.user = await usuarios.filter((movie) => movie.email == this.inputEmail);
        this.setUserData();
        this.publishLoginEvent();
        //this.presentLoading();
        this.goToHomePage();
      } else {
        this.userToast();
      }
    } else {
      this.userToast();
    }
  }

  setUserData(){
    this.userModel.setUserMail(this.inputEmail);
    //this.userModel.setUserName(this.user[0].name);
  }

  publishLoginEvent(){
    this.events.publish('user:login', this.userModel.getUserName(), this.userModel.getUserMail());
  }

  userToast() {
    let toast = this.toastCtrl.create({
      message: 'Usuário não existe, verifique as informações!',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  toggleShow(){
      this.show = !this.show;
      if (this.show){
          this.type = "text";
      }
      else {
          this.type = "password";
      }
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 200
    });
    loader.present();
    this.goToHomePage();
  }

  openAnime(animeId){
    this.navCtrl.push('AnimeDetail', {animeId:animeId});
  }

  createCode() {
    this.createdCode = this.qrData;
  }
 
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      console.log(this.scannedCode);
    }, (err) => {
        console.log('Error: ', err);
    });
  }
}