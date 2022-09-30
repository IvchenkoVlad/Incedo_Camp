import { Component } from '@angular/core';

@Component({
  selector: 'app-root1',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'incedoDemoApp';
  name: string = 'incedo'
  currentDate = new Date();
  formSelector : string = ''

  clickMessage: string = 'Morning';
  callArrayCrud(){
    this.formSelector = 'array-crud'
  }
  callJsonCrud(){
    this.formSelector = 'json-crud'
  }
  onClickMe() {

    if(this.clickMessage === 'Morning'){
      this.clickMessage = ' Training! is Active ';
    }
    else{
      this.clickMessage = 'Morning'
    }
    console.log('event fired !!--->');
    //this.clickMessage = ' Training! is Active ';

  }
}
