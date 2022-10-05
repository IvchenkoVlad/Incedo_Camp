import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/model/person';
import { MyServiceService } from 'src/app/service/my-service.service';

@Component({
  selector: 'app-user-crud-json-component',
  templateUrl: './user-crud-json-component.component.html',
  styleUrls: ['./user-crud-json-component.component.css']
})
export class UserCrudJsonComponentComponent implements OnInit {

  personList : Person[] = []; //for user values
 person = new Person(0, '', '', '', ''); // dummy data
  
  constructor( private _httpService : MyServiceService) { }

  //PAGE LOADS WITH DATA ALREADY
  ngOnInit(): void {
    this.getAllPersons()
  }
  //GET ALL DATA IN ARRAY OF USERS AND SORT IT
  getAllPersons(){
    this._httpService.getPersons() 
          .subscribe(data => {
            this.personList = data;
            this.personList.sort((a,b)=> a.id - b.id);
          }); 
  }
  //ADDING NEW USER
  addNewPerson(){
    let index = this.personList.findIndex( user => user.id === this.person.id)
    if(index == -1) {
      //adding new user if id wasnt not in the array
      let userToAdd = new Person(this.person.id, this.person.name, this.person.address, this.person.location, this.person.country)
      this._httpService.addPerson(userToAdd).subscribe();
      this.person = new Person(0, '', '', '', '');
      this.getAllPersons();
    }
    else{
      alert(`USER WITH THE ID ${this.person.id} ALREADY IN THE TABLE.\nTRY DIFFERENT ID!`)
      this.person = new Person(0, '', '', '', '');
    }
  }
  //CONFIRMING THE EDITION OF USER
  confirmPersonEdit(){
    let index = this.personList.findIndex( user => user.id === this.person.id)
    if(index != -1) {
      this._httpService.updatePersonById(this.person).subscribe();
      this.person = new Person(0, '', '', '', '');
      this.getAllPersons();
    }
    else{
      alert(`USER WITH THE ID ${this.person.id} DOESN'T EXIST.\nPLEASE PROVIDE REAL ID TO PERFORM EDIT FUNCTIONALITY!`)
      this.person = new Person(0, '', '', '', '');
    }
  }
  //DELETING USER BY ID
  deletePerson(id:number){
    this._httpService.deletePerson(id).subscribe();
    this.getAllPersons();
  }
  //FILLING THE DATA OF THE FORM FOR EDITION
  editPerson(id:number){
    this._httpService.getPersonById(id).subscribe(data => this.person = data);
  }
}
