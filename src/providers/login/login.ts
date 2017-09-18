import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

public userMail: string;

  constructor(public http: Http) {
    console.log('Constructor Hello LoginProvider Provider');
  }

  setUserMail(email) {
    this.userMail = email;
  }

  getUserMail(){
    return this.userMail;
  }

}
