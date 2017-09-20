import { Injectable } from '@angular/core';

@Injectable()
export class UserModel {
    
    public userMail: string;
    public userName;
    

    constructor() {}

    setUserMail(email) {
        this.userMail = email;
    }

    getUserMail(){
        return this.userMail;
    }

    setUserName(name){
        this.userName = name;
    }

    getUserName(){
        return this.userName;
    }

}  