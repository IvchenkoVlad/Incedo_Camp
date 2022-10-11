import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = ''
  name: string = ''
  password: string = ''
  role: string = ''
  usersList: User[] = []

  constructor(private logoutService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  //register main method 
  //added functionality of privilged addition into DB
  //everytime session is for admin, the status is also ACTIVE (not requested) addidng through admin bypass the structure
  register() {
    let nowDate = new Date().toISOString().split('T')[0]
    let status = 'requested'
    if (sessionStorage.getItem('isAdmin')) { //here we change status is admin was logged in
      status = 'active'
      console.log('ADMIN CHANGE')
    }
    let userToAdd = new User(this.username, this.password, this.name, this.role, status, nowDate);
    //console.log('here-> '+JSON.stringify(userToAdd));
    this.logoutService.getUsers().subscribe(data => {
      this.usersList = data;
      
      if (this.usersList.find(x => x.username === this.username) == undefined) {
        //console.log('here # 2-> '+JSON.stringify(userToAdd));
        this.logoutService.addUser(userToAdd).subscribe();
        if (sessionStorage.getItem('isAdmin')) {
          alert('As admin you added new user. Status is "ACTIVE" right away.')
          this.router.navigate(['usermanagement'])
        }
        else {
          alert('You have succesfully created a request...you will now get redirected to login page.')
          this.router.navigate(['login'])
        }

      }
      else {
        alert('Username is not vacant. Try changing username!')
        this.router.navigate(['register']);
      }
    });

  }

//checking the value of the role life
  onSelected(value: string) {
    this.role = value;
  }

  seePass(){
    console.log(document.getElementById('password')?.getAttribute('type'))
    if(document.getElementById('password')?.getAttribute('type') == 'password'){
      document.getElementById('password')?.setAttribute('type','text')
    }else{
      document.getElementById('password')?.setAttribute('type','password')
    }
  }

}
