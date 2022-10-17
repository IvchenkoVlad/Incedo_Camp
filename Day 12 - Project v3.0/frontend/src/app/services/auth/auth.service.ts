import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //value used to contoll the AUTH (session manager is implemented)
  isLoggedIn = sessionStorage.getItem('isLogged') == null ? false : sessionStorage.getItem('isLogged');
  isAdmin = sessionStorage.getItem('isAdmin') == null ? false : sessionStorage.getItem('isAdmin');
  isLead = sessionStorage.getItem('isLead') == null ? false : sessionStorage.getItem('isLead');
  username = sessionStorage.getItem('currentUser') == null  ? '' : sessionStorage.getItem('currentUser');
  currentUser! : User;
  
  constructor() { }
  isAuthenticated() {
    return this.isLoggedIn;
  }
  //change the status to login
  authenticate(user : User){
    this.isLoggedIn = true; sessionStorage.setItem('isLogged', ''+this.isLoggedIn)
    this.username = user.username; sessionStorage.setItem('currentUser', this.username)
    this.currentUser = user;
  }

  //getting logged user
  getLoggedUser(){
    return this.username;
  }

  //logging out the user
  logoutUser(){
    this.isLoggedIn =  false;
    this.username = ''; this.isAdmin = false; this.isLead=false;
    sessionStorage.clear()
  }
  //changing the value of login for admin
  logAsAdmin(){
    this.isAdmin = true;sessionStorage.setItem('isAdmin', ''+this.isLoggedIn)
  }
  //changing the value of login for admin
  logAsLead(){
    this.isLead = true;sessionStorage.setItem('isLead', ''+this.isLoggedIn)
  }

  isCurrentSessionAdmin(){
    if(this.isAdmin){
      return true;
    }
    return false;
  }

  getAdminOrLead(){
    if(this.isAdmin && !this.isLead){
      return 'admin'
    }
    else if(this.isLead && !this.isAdmin){
      return 'lead'
    }
    return 'error';
  }

}
