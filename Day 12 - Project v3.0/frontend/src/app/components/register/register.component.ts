import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { MessageService } from 'src/app/services/message.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = ''
  name: string = ''
  password: string = ''
  repeatpassword : string = ''
  role: string = ''
  email: string = ''
  usersList: User[] = []
  registerForm!: FormGroup;
  submitted = false;
  

  constructor(private logoutService: LoginService, private router: Router, private formBuilder: FormBuilder,
    private emailService: MessageService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userid: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
      }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }
}
  //register main method 
  //added functionality of privilged addition into DB
  //everytime session is for admin, the status is also ACTIVE (not requested) addidng through admin bypass the structure
  register() {
    this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }
    else{
      
      let nowDate = new Date().toISOString().split('T')[0]
      let status = 'requested'
      if (sessionStorage.getItem('isAdmin')) { //here we change status is admin was logged in
        status = 'active'
        console.log('ADMIN CHANGE')
      }
      let userToAdd = new User(this.registerForm.value['userid'], this.registerForm.value['password'], this.registerForm.value['name'], this.registerForm.value['role'], status, nowDate, this.registerForm.value['email']);
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
            this.emailService.sendAdminNotifyMessage(userToAdd).subscribe();
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
    

    console.log(this.registerForm.value['email'])
    

  }
  get f() { return this.registerForm.controls; }

//checking the value of the role life
  onSelected(value: string) {
    this.role = value;
  }

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

  seeConfPass(){
    console.log(document.getElementById('passwordconf')?.getAttribute('type'))
    if(document.getElementById('passwordconf')?.getAttribute('type') == 'password'){
      document.getElementById('passwordconf')?.setAttribute('type','text')
      document.getElementById('togglePassword1')?.classList.remove('bi-eye-slash');
      document.getElementById('togglePassword1')?.classList.add('bi-eye');
    }else{
      document.getElementById('passwordconf')?.setAttribute('type','password')
      document.getElementById('togglePassword1')?.classList.remove('bi-eye');
      document.getElementById('togglePassword1')?.classList.add('bi-eye-slash');
    }
  }

  

}
