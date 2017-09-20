import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

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
    private toastCtrl: ToastController
  ) {
  }

  async save() {
    let usuarios = await this.storage.get('usuarios') as any[];
    if (!usuarios) usuarios = [];
    this.userPush(usuarios);  
    this.setUserStorage(usuarios);
    this.sucessToast();
  }  

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
