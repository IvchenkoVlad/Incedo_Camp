import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  user : User = new User('','','','','','','');
  constructor(private router: Router, public authService : AuthService){
  }

  logout(){
    console.log('here!!');
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  main(){
    this.router.navigate(['/'])
  }
}
