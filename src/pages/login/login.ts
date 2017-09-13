import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
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
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  OpenRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  goToHomePage() {
    this.navCtrl.push(HomePage);
  }

  async login() {
    console.log("logando");
    const usuarios = await this.storage.get('usuarios') as any[];
    //const resultado = usuarios.some((usuario) => usuario.email == this.inputEmail && usuario.password == this.inputPassword);
    console.log(usuarios);
    //if (resultado) {
      this.goToHomePage();
    //} else {
      //this.userToast();
      //console.log("Usuario nao existe");
    //}
    //if (this.inputUsername == this.username && this.inputPassword == this.password) {
    /*} else {
      this.userToast()
    }*/
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
