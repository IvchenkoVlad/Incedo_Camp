import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-replacepassword',
  templateUrl: './replacepassword.component.html',
  styleUrls: ['./replacepassword.component.css']
})
export class ReplacepasswordComponent implements OnInit {

  username : string = ''
  password : string = ''
  confirmpassword : string = ''
  user : User [] = [];
  constructor(private router: Router, private route: ActivatedRoute, private changePassService : LoginService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.username = routeParams.get('username')!;
  }
  change(){
    if((this.password != '' && this.confirmpassword != '') && this.password == this.confirmpassword){
      console.log('USERNAME->'+this.username)
      this.changePassService.getUserByUsername(this.username).subscribe(
        data =>{
          this.user = data;
          let userToUpdate = this.user[0]
          // console.log('OLD->'+JSON.stringify(this.user[0]))
          this.user[0].password = this.password;
          // console.log('NEW->'+JSON.stringify(this.user[0]))
          this.changePassService.updateRoleStatus(userToUpdate).subscribe();
        }
      )
      this.router.navigate(['login']);
    }
    else{
      this.password = ''
      this.confirmpassword = ''
      alert('Password cant be empty and should match!')
    }
    
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
