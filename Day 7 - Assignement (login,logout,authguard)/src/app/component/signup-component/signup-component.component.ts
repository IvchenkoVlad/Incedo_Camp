import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginLogoutServiceService } from 'src/app/service/login-logout-service.service';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css']
})
export class SignupComponentComponent implements OnInit {

  username : string ='';
  password : string = '';
  usersList : User[]=[]
  
  constructor(private _httpService : LoginLogoutServiceService, private router : Router) { }

  ngOnInit(): void {
  }
  register(){
   this._httpService.registerUser(new User(this.username, this.password)).subscribe();
   alert(`You signed up with the username ${this.username}. Now, you will be deridected to login page.`)
   this.router.navigate(['/login'])
  }

}
