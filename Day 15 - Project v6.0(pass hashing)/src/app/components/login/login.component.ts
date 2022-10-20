import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/login.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string = '';
  password : string = '';
  usersList : User[]= [];

  constructor(private loginService : LoginService, private router : Router, public authService : AuthService) { }

  ngOnInit(): void {
  }

  hashpassword(){
    let password = "admin"
    const salt = bcrypt.genSaltSync(10);
    let pass = bcrypt.hashSync(password, salt);
    console.log(pass)
    return pass;
  
  }
  checkhashed(checkingPassword : string, hashedPassword : string) : boolean{
    let reverse = bcrypt.compareSync(checkingPassword, hashedPassword)
    return reverse;
  }
  secureLogin(){
    console.log(this.checkhashed(this.username, this.hashpassword()))
  }

  //method to control login functionality (it also checks for roles) --> applying the different method and calling AUTH SERVICE 
  login(){
    if(this.username != '' && this.password != ''){
      this.loginService.getUsers().subscribe(data => {
        this.usersList = data;
        if(this.usersList.find(x => x.username === this.username) != undefined){ //looking for appropriate db record
          let user = this.usersList.find(x => x.username === this.username);
          if(!this.checkhashed(this.password, user!.password)){ //if pass is incorrect
            alert(`Trying to log in with [${user?.username}]. Password is incorrect`)
            this.username = ''
            this.password = ''
          }else{ 
            //this.authService.authenticate(user.username);
            if(user!.role === 'admin'){
              if(user!.status != 'active'){
                alert(`The user with ${user!.username} is not 'active'`)
              }
              else{ //authintication is done here as an ADMIN
              this.authService.authenticate(user!);
              this.authService.logAsAdmin();
              this.loginAsAdmin();
              }
  
            }
            else if (user!.role === 'lead'){
              if(user!.status != 'active'){
                alert(`The user with ${user!.username} is not 'active'. Please contact admin to activate access.`)
              }
              else{ //authintication is done here as an LEAD
              this.authService.authenticate(user!);
              this.authService.logAsLead();
              this.loginAsUser();
              }
            }
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
//simple nav router link
loginAsAdmin() {
  this.router.navigate(['/usermanagement']);
}
//simple nav router link
loginAsUser() {
  this.router.navigate(['/dashboard']);
}

//eye toggle functionality
seePass(){
  console.log(document.getElementById('password')?.getAttribute('type'))
  if(document.getElementById('password')?.getAttribute('type') == 'password'){
    document.getElementById('password')?.setAttribute('type','text')
    document.getElementById('togglePassword')?.classList.remove('bi-eye-slash');
    document.getElementById('togglePassword')?.classList.add('bi-eye');
  }else{
    document.getElementById('password')?.setAttribute('type','password')
    document.getElementById('togglePassword')?.classList.remove('bi-eye');
    document.getElementById('togglePassword')?.classList.add('bi-eye-slash');
  }
}
}


