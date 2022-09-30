import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { MyServiceService } from 'src/app/service/my-service.service';

@Component({
  selector: 'app-user-crud-json-component',
  templateUrl: './user-crud-json-component.component.html',
  styleUrls: ['./user-crud-json-component.component.css']
})
export class UserCrudJsonComponentComponent implements OnInit {

  usersList : User[] = []; //for user values
  user = new User(0, '', '', '', ''); // dummy data
  message : string = ''
  constructor( private _httpService : MyServiceService) { }

  //PAGE LOADS WITH DATA ALREADY
  ngOnInit(): void {
    this.getAllUsers()
  }
  //GET ALL DATA IN ARRAY OF USERS AND SORT IT
  getAllUsers(){
    this._httpService.getUsers() 
          .subscribe(data => {
            this.usersList = data;
            this.usersList.sort((a,b)=> a.id - b.id);
          }); 
  }
  //ADDING NEW USER
  addNewUser(){
    let index = this.usersList.findIndex( user => user.id === this.user.id)
    if(index == -1) {
      //adding new user if id wasnt not in the array
      let userToAdd = new User(this.user.id, this.user.name, this.user.address, this.user.location, this.user.country)
      this._httpService.addUser(userToAdd).subscribe();
      this.user = new User(0, '', '', '', '');
      this.getAllUsers();
    }
    else{
      alert(`USER WITH THE ID ${this.user.id} ALREADY IN THE TABLE.\nTRY DIFFERENT ID!`)
      this.user = new User(0, '', '', '', '');
    }
  }
  //CONFIRMING THE EDITION OF USER
  confirmUserEdit(){
    let index = this.usersList.findIndex( user => user.id === this.user.id)
    if(index != -1) {
      this._httpService.updateUserById(this.user).subscribe();
      this.user = new User(0, '', '', '', '');
      this.getAllUsers();
    }
    else{
      alert(`USER WITH THE ID ${this.user.id} DOESN'T EXIST.\nPLEASE PROVIDE REAL ID TO PERFORM EDIT FUNCTIONALITY!`)
      this.user = new User(0, '', '', '', '');
    }
  }
  //DELETING USER BY ID
  deleteUser(id:number){
    this._httpService.deleteUser(id).subscribe();
    this.getAllUsers();
  }
  //FILLING THE DATA OF THE FORM FOR EDITION
  editUser(id:number){
    this._httpService.getUserById(id).subscribe(data => this.user = data);
  }
}
