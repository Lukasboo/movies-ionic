import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { UserModel } from '../../models/user-model/user.model';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private toastCtrl: ToastController,
    private userModel: UserModel,
    public events: Events
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
    const usuarios = await this.storage.get('usuarios') as any[];
    if(usuarios) {
      const resultado = usuarios.some((usuario) => usuario.email == this.inputEmail && usuario.password == this.inputPassword);
      if (resultado) {
        this.user = await usuarios.filter((movie) => movie.email == this.inputEmail);
        this.setUserData();
        this.publishLoginEvent();
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

}