import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  inputName: string;
  inputAge: number;
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

  async save() {
    let usuarios = await this.storage.get('usuarios') as any[];
    if (!usuarios) usuarios = [];
    this.userPush(usuarios);  
    this.setUserStorage(usuarios);
    this.sucessToast();
  }  

  /*async save() {
    this.loginProvider.registerUser(this.inputEmail, this.inputPassword).subscribe(
      (data) => {
        //console.log("data print");
        console.log(data.json());
        /*this.loginValid = data.json();
        console.log("login valid = " + this.loginValid);

        if(this.loginValid === "true"){
          //this.setUserData();
          this.publishLoginEvent();
          this.presentLoading();
        } else {
          this.userToast();
        }*/
      /*}, error => {
        console.log(error);
      }
    )
   
  }*/

  setUserStorage(usuarios){
    this.storage.set('usuarios', usuarios);
  }

  userPush(usuarios){
    usuarios.push({
      name: this.inputName,
      age: this.inputAge,
      email: this.inputEmail,
      password: this.inputPassword
    });
  }

  sucessToast() {
    let toast = this.toastCtrl.create({
      message: 'Usuário adicionado com sucesso!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
