import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  //baseApiPath = "http://localhost:3000/users/login";
  baseApiPath = "http://localhost:3000";
  headers = new Headers({'Content-Type' : 'application/json'});
  
  
  constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }

  /*loginValidate(useremail, userPassword){
    return this.http.get(
      this.baseApiPath + 
      "users/login/" + useremail + "/" + userPassword);
  };*/

  loginValidate(useremail, userPassword){
    /*let body = JSON.stringify({
      userEmail: "lukas_boo@hotmail.com",
      userPassword: "QL0AFWMIX8NRZTKeof9cXsvbvu8=" });*/

    let body = JSON.stringify({
      userEmail: useremail,
      userPassword: userPassword });  


    let headers = new Headers({ 
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT' });
  
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: this.headers
    });
    //console.log("login provider response");
    //console.log(this.http.post(this.baseApiPath, body, options));
    return this.http.post(this.baseApiPath + "/users/login", body, options)
  };

  
  registerUser(useremail, userPassword){
    /*let body = JSON.stringify({
      userEmail: "lukas_boo@hotmail.com",
      userPassword: "QL0AFWMIX8NRZTKeof9cXsvbvu8=" });*/

    let body = JSON.stringify({
      userEmail: useremail,
      userPassword: userPassword 
    });  

    let headers = new Headers({ 
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT' });
  
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: this.headers
    });
    //console.log("login provider response");
    //console.log(this.http.post(this.baseApiPath, body, options));
    return this.http.post(this.baseApiPath + "/users", body, options)
  };

  

}
