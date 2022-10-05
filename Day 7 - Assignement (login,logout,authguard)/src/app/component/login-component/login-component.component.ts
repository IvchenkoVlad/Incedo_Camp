import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { LoginLogoutServiceService } from 'src/app/service/login-logout-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  username : string ='';
  password : string = '';
  usersList : User[]=[]
  
  constructor(private _httpService : LoginLogoutServiceService, private router : Router, private authService : AuthService) { }

  ngOnInit(): void {
  }
  login(){
    this._httpService.getUsers().subscribe(data => {
      this.usersList = data;
      if(this.usersList.find(x => x.username === this.username) != undefined){
        let user = this.usersList.find(x => x.username === this.username);
        if(user?.password != this.password){
          alert(`Trying to log in with [${user?.username}]. Password is incorrect`)
          this.username = ''
          this.password = ''
        }else{ 
          this.authService.authenticate(user.username);
          this.router.navigate(['/dashboard'])
        }
      }
      else{
        alert(`No data with associated with username ${this.username}`)
        this.username = ''
        this.password = ''
      }
    });
    }

}
