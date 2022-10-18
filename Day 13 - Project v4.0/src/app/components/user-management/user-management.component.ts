import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  usersList: User[] = [];
  changesMap = new Map<number, [boolean, boolean]>();
  selectedValues = new Map<number, [string, string]>();
  srole: string = ''
  userNameSorted: boolean = false;
  nameSorted: boolean = false;
  dateSorted: boolean = false;


  constructor(private loginService: LoginService, private router: Router, private emailService : MessageService) { }

  ngOnInit(): void {
    this.getData();
  }
  //sorting by name invoked when pressed 
  sortByUserName() {
    if (!this.userNameSorted) {
      this.usersList.sort(
        (a, b) => b.username.localeCompare(a.username)
      );
      this.userNameSorted = true;
    }
    // /a.name.localeCompare(b.name)
    else {
      this.usersList.sort(
        (a, b) => a.username.localeCompare(b.username)
      );
      this.userNameSorted = false;
    }
  }

  //help to display date in the table in appropriate format
  getFormatedDate(date: string) {
    let newDate = new Date(date);
    return newDate;
  }
  //name sorting
  sortByName() {
    if (!this.nameSorted) {
      this.usersList.sort(
        (a, b) => b.name.localeCompare(a.name)
      );
      this.nameSorted = true;
    }
    // /a.name.localeCompare(b.name)
    else {
      this.usersList.sort(
        (a, b) => a.name.localeCompare(b.name)
      );
      this.nameSorted = false;
    }
  }
  //date sorting
  sortByDate() {
    if (!this.dateSorted) {
      this.usersList.sort(
        (a, b) => b.requestdate.localeCompare(a.requestdate)
      );
      this.dateSorted = true;
    }
    // /a.name.localeCompare(b.name)
    else {
      this.usersList.sort(
        (a, b) => a.requestdate.localeCompare(b.requestdate)
      );
      this.dateSorted = false;
    }
  }
  //get data to populate the table
  getData() {
    this.usersList = []
    this.loginService.getUsers().subscribe(
      data => {
        let tempUserList: User[] = [];
        tempUserList = data;
        for(let item of tempUserList){
          if(item.status != 'reject'){
            this.usersList.push(item);
          }
        }
        // alert("total => " + this.usersList.length + " <-" + JSON.stringify(this.usersList))
        //this.usersList = tempUserList;
        //here perform sorting
        this.usersList.sort(
          (a, b) => b.requestdate.localeCompare(a.requestdate)
        );
        for (let i = 0; i < this.usersList.length; i++) {
          this.changesMap.set(i, [false, false]);
          this.selectedValues.set(i, [this.usersList[i].role, this.usersList[i].status]);
        }
      }
    )
    
  }
  //method that get invoked when STATUS AND ROLE OR STATUS OR ROLE gets changed
  aproveChange(arrayIndex: number) {
    //console.log(this.selectedValues)
    let oldUser = this.usersList[arrayIndex];
    let currentChangedValue = this.selectedValues.get(arrayIndex)
    let timeFormat = oldUser.requestdate.split('T')[0]; console.log(timeFormat)
    oldUser.requestdate = timeFormat;
    oldUser.role = currentChangedValue![0];
    oldUser.status = currentChangedValue![1];
    console.log('->' + JSON.stringify(oldUser))
    this.loginService.updateRoleStatus(oldUser).subscribe();
    this.emailService.sendUserNotifyMessage(oldUser).subscribe();
    this.getData()
    // this.ngOnInit()
    this.router.navigate(['/usermanagement'])
  }
  //here i use map data structure to track changes of the status and role (help to disable and enable submit button)
  onSelectedStatus(statusValue: string, arrayIndex: number) {
    if(statusValue != 'reject'){
      if (this.usersList[arrayIndex].status != statusValue) {
      this.changesMap.set(arrayIndex, [this.changesMap.get(arrayIndex)![0], true]);
      this.selectedValues.set(arrayIndex, [this.selectedValues.get(arrayIndex)![0], statusValue]);
    }
    else {
      this.changesMap.set(arrayIndex, [this.changesMap.get(arrayIndex)![0], false]);
      this.selectedValues.set(arrayIndex, [this.selectedValues.get(arrayIndex)![0], statusValue]);
    }
    this.activateDeactiveButton(arrayIndex);
    }
    else{
      document.getElementById('button' + arrayIndex)?.setAttribute('disabled', '');
      //document.getElementById("MyElement").classList.remove('MyClass');
      document.getElementById('button'+arrayIndex)?.classList.remove('btn-success');
      document.getElementById('button'+arrayIndex)?.classList.add('btn-danger');
      document.getElementById('button'+ arrayIndex)!.innerHTML = 'Make a Change!'
    }
    
  }
  //here i use map data structure to track changes of the status and role (help to disable and enable submit button)
  onSelectedRole(roleValue: string, arrayIndex: number) {
    if (this.usersList[arrayIndex].role != roleValue) {
      this.changesMap.set(arrayIndex, [true, this.changesMap.get(arrayIndex)![1]]);
      this.selectedValues.set(arrayIndex, [roleValue, this.selectedValues.get(arrayIndex)![1]]);
    }
    else {
      this.changesMap.set(arrayIndex, [false, this.changesMap.get(arrayIndex)![1]]);
      this.selectedValues.set(arrayIndex, [roleValue, this.selectedValues.get(arrayIndex)![1]]);
    }
    this.activateDeactiveButton(arrayIndex);
  }
  //this method helps to 
  activateDeactiveButton(arrayIndex: number) {
    let left = this.changesMap.get(arrayIndex)?.[0];
    let right = this.changesMap.get(arrayIndex)?.[1];
    if (left || right) {
      document.getElementById('button' + arrayIndex)?.removeAttribute('disabled')
      document.getElementById('button'+arrayIndex)?.classList.remove('btn-danger');
      document.getElementById('button'+arrayIndex)?.classList.add('btn-success');
      document.getElementById('button'+ arrayIndex)!.innerHTML = 'Approve Change'
    //  console.log( document.getElementById('button'+ arrayIndex)?.innerText)
    //  document.getElementById('button'+ arrayIndex)?.innerText.replace('Approve Change','Now')
    //  let btn = document.getElementById('button'+ arrayIndex);
  

    }
    else if (!left && !right) {
      document.getElementById('button' + arrayIndex)?.setAttribute('disabled', '');
      //document.getElementById("MyElement").classList.remove('MyClass');
      document.getElementById('button'+arrayIndex)?.classList.remove('btn-success');
      document.getElementById('button'+arrayIndex)?.classList.add('btn-danger');
      document.getElementById('button'+ arrayIndex)!.innerHTML = 'Make a Change!'
    }
  }
  priviligedAdd() {
    this.router.navigate(['register'])
  }

  rejectUser(arrayIndex : number){
    alert(`limiting access because`)
    let oldUser = this.usersList[arrayIndex];
    let currentChangedValue = this.selectedValues.get(arrayIndex)
    let timeFormat = oldUser.requestdate.split('T')[0]; console.log(timeFormat)
    oldUser.requestdate = timeFormat;
    oldUser.role = currentChangedValue![0];
    oldUser.status = "reject";
    console.log('->' + JSON.stringify(oldUser))
    this.loginService.updateRoleStatus(oldUser).subscribe();
    this.emailService.sendUserNotifyMessage(oldUser).subscribe();
    this.getData()
    // this.ngOnInit()
    this.router.navigate(['/usermanagement'])
  }
}

