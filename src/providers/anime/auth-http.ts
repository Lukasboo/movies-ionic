import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthHttpProvider {

  aniListEndpoint:string;
  constructor(public http: Http) {
    this.aniListEndpoint = 'https://anilist.co/api/auth/access_token';
  }
  get(url){
  	return this.verifyToken()
  	.then(token=>{
			let headers = new Headers();
			//console.log("valor certo");
			//console.log(`Bearer ${localStorage.getItem('token')}`);
			//headers.append('Authorization', 'YqkGZRgBe1My9GlPMljuxTItKUSaK');
			headers.append('Content-Type', 'application/json');
			//headers.append('Authorization', 'Bearer NmY39xGNbEfNos0QYNf8dQjJLp2O1tgNkobbecr3');
	  	headers.append('Authorization',`Bearer ${localStorage.getItem('token')}`);
	  	return this.http.get(url,{headers:headers}).map(response => response.json());
  	}).then(response=>{
			//return response.toPromise();
			return response;
  	})
  }
  verifyToken():Promise<string>{
		//console.log("verifyToken");
  	return new Promise((resolve, reject)=>{
	  	this.getToken().subscribe(data=>{
	  		localStorage.setItem('token', data.access_token);
	  		resolve(data.access_token);
	  	});
  	})
    
  }
  /*getToken(){
  	let search = new URLSearchParams();
  	search.append('grant_type','client_credentials');
  	search.append('client_id', 'dgurgel-08ya9');
  	search.append('client_secret', 'AbWDL9uegWpMP1s3s6P');
  	return this.http.post(this.aniListEndpoint, search).map(response=>response.json());
  }*/

  getToken(){
		//console.log("getToken");
  	let search = new URLSearchParams();
  	search.append('grant_type','client_credentials');
  	search.append('client_id', 'lucasdaniel-l0rpt');
		search.append('client_secret', 'YqkGZRgBe1My9GlPMljuxTItKUSaK');
		//console.log(this.http.post(this.aniListEndpoint, search).map(response=>response.json()));
  	return this.http.post(this.aniListEndpoint, search).map(response=>response.json());
  }

}
