import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  username : string = '';
  
  constructor() { }
  isAuthenticated() {
    return this.isLoggedIn;
  }
  authenticate(username : string){
    this.isLoggedIn = true;
    this.username = username;
  }

  getLoggedUser(){
    return this.username;
  }

  logoutUser(){
    this.isLoggedIn =  false;
    this.username = ''
  }
}
