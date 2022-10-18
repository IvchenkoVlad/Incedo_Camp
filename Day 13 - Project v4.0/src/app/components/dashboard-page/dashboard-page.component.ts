import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Designationarea } from 'src/app/model/designationarea';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  //variables to hold neccessary data from correct display
  projectsList : Project[] = [];
  designationArea : Designationarea [] = [];
  sortedByProjectName : boolean = false;
  sortedBySapId : boolean = false;

  constructor(private projectService : ProjectService, private router: Router) { }

  //loads data from DB as sson as page pops up 
  ngOnInit(): void {
    this.getProjectsData();
  }
  //invoked when user presses on the header field (Name) return sorted array by project.name field
  sortByProjectName(){
    if(!this.sortedByProjectName){
      this.projectsList.sort(
        (a,b) => b.name.localeCompare(a.name)
      );
      this.sortedByProjectName = true;
    }
    else{
      this.projectsList.sort(
        (a,b) => a.name.localeCompare(b.name)
      );
      this.sortedByProjectName = false;
    }
  }
   //invoked when user presses on the header field (SAPId) return sorted array by project.sapid field
  sortBySapId(){
    if(!this.sortedBySapId){
      this.projectsList.sort(
        (a,b) => b.sapid.localeCompare(a.sapid)
      );
      this.sortedBySapId = true;
    }
    else{
      this.projectsList.sort(
        (a,b) => a.sapid.localeCompare(b.sapid)
      );
      this.sortedBySapId = false;
    }
  }

  //method to populate array with data via SQL
  getProjectsData(){
    this.projectService.getAllProjects().subscribe(data => this.projectsList = data);
    this.projectService.getAreas().subscribe(data=>this.designationArea = data);
  }
  //populates the select dropdown with all areas of development also bond to html via ngmodel
  getAreaSpecificData(val : string){
    let indexToGet = +val;
    if([1,2,3,4].find( x => x === indexToGet) == undefined){
      this.projectService.getAllProjects().subscribe(data => this.projectsList = data);
    }
    else{
      this.projectService.getProjectsByArea(indexToGet).subscribe(data=>this.projectsList = data);
    }
    
  }

  getTimeSpecificData(){
    let from = sessionStorage.getItem('globalFROM')
    let to = sessionStorage.getItem('globalTO')
    console.log('')
    if(from != null && to != null){
      this.projectService.getProjectsByDate(from!,to!).subscribe(data => {
        this.projectsList = data;
      })
    } 
    else{
      alert('nope')
    }
    
    
  }
  //dummy method to show the growth of future functionality
  approveAndDownload(){

  }

  
}
