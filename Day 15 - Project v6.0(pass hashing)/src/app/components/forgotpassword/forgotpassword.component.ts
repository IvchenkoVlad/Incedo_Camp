import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  email : String = ''
  allUsers : User [] = []

  constructor(private userService : LoginService, private messageService: MessageService, private router : Router) { }

  ngOnInit(): void {
  }
  requestAChange(){
    this.userService.getUsers().subscribe(
      data => {
        this.allUsers = data;
        if(this.allUsers.find(x=>x.email == this.email) != undefined){
          let user = this.allUsers.find(x=>x.email == this.email);
          //alert(JSON.stringify(user?.password))
          this.messageService.sendRenewalMessage(user!).subscribe();
          
        }
      }
    )
    alert(`If the username associated with email:${this.email} exist - you will recieve the link to change the password!`)
    this.router.navigate(['login']);
  }

}
