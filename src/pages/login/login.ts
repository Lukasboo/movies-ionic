import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { UserModel } from '../../models/user-model/user.model';
import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private toastCtrl: ToastController,
    private userModel: UserModel,
    public events: Events,
    public loadingCtrl: LoadingController,
    private loginProvider: LoginProvider
  ) {
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

    this.loginProvider.loginValidate(this.inputEmail, this.inputPassword).subscribe(
      (data) => {
        console.log("data print");
        console.log(data.json().resp);
        this.loginValid = data.json().resp;
        console.log("login valid = " + this.loginValid);

        if(this.loginValid === "true"){
          //this.setUserData();
          this.publishLoginEvent();
          this.presentLoading();
        } else {
          this.userToast();
        }
      }, error => {
        console.log(error);
      }
    )

    console.log("login valid = " + this.loginValid);
   
  }
    /*const usuarios = await this.storage.get('usuarios') as any[];
    if(usuarios) {
      const resultado = usuarios.some((usuario) => usuario.email == this.inputEmail && usuario.password == this.inputPassword);
      if (resultado) {
        this.user = await usuarios.filter((movie) => movie.email == this.inputEmail);
        this.setUserData();
        this.publishLoginEvent();
        this.presentLoading();
        //this.goToHomePage();
      } else {
        this.userToast();
      }
    } else {
      this.userToast();
    }*/
  //}

  setUserData(){
    this.userModel.setUserMail(this.inputEmail);
    this.userModel.setUserName(this.user[0].name);
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
      duration: 1500
    });
    loader.present();
    this.goToHomePage();
  }

}