import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user';
import { AuthService } from './service/auth/auth.service';
import { LoginLogoutServiceService } from './service/login-logout-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn : boolean = false;
  title = 'incedoDemoApp';

  username : string ='';
  password : string = '';
  usersList : User[]=[]

  
  constructor(private _httpService : LoginLogoutServiceService, private router : Router, public authService : AuthService) { }

  logout(){
    console.log('here!!');
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }
   
}
