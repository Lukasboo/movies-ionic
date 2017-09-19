import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private toastCtrl: ToastController,
    private loginProvider: LoginProvider
  ) {
  }

  OpenRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  goToHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  logout() {
    //window.location.reload;
    this.loginProvider.setUserMail("");
    this.navCtrl.setRoot(LoginPage);
  }

  async login() {
    const usuarios = await this.storage.get('usuarios') as any[];
    if(usuarios) {
      const resultado = usuarios.some((usuario) => usuario.email == this.inputEmail && usuario.password == this.inputPassword);
      console.log(usuarios);
      if (resultado) {
        this.loginProvider.setUserMail(this.inputEmail);
        this.goToHomePage();
      } else {
        this.userToast();
      }
    } else {
      this.userToast();
    }
  }

  userToast() {
    let toast = this.toastCtrl.create({
      message: 'Usuário não existe, verifique as informações!',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}