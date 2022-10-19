import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Designationarea } from 'src/app/model/designationarea';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import * as FileSaver from 'file-saver';

const CSV_EXTENSION = '.csv';
const CSV_TYPE = 'text/plain;charset=utf-8';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  //variables to hold neccessary data from correct display
  // projectsList : Project[] = [];
  // designationArea : Designationarea [] = [];
  // sortedByProjectName : boolean = false;
  // sortedBySapId : boolean = false;
  csvRecords: any;
  header: boolean = false;
  listOfProjects : Project[] = [];

  constructor(private ngxCsvParser: NgxCsvParser,private projectService : ProjectService){}//private projectService : ProjectService, private router: Router) { }

  //loads data from DB as sson as page pops up 
  ngOnInit(): void {
    //this.getProjectsData();
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener1($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: false, delimiter: ',', encoding: 'utf8' })
      .pipe().subscribe({
        next: (result): void => {
          console.log('Result', result);
          this.csvRecords = result;
          for(let i = 1; i < this.csvRecords.length; i++){
            let line = this.csvRecords[i]
            this.listOfProjects.push(new Project(line[1],line[5],line[4],line[0],line[4]/8,0,line[4]/8+0,(line[4]/8+0)*150,+line[9]+1000))
          }
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });
  }

  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  }

  public doIt(){
    let today = new Date();
    this.exportToCsv(this.listOfProjects,`csvExport_${today.getMonth()}-${today.getDay()}-${today.getFullYear()}@(${today.getHours()}-${today.getMinutes()})`)
  }
  
  public exportToCsv(rows: Project[], fileName: string, columns?: string[]) {
    if (!rows || !rows.length) {
      return '';
    }
    const separator = ',';
    const keys = Object.keys(rows[0]).filter(k => {
      if (columns?.length) {
        return columns.includes(k);
      } else {
        return true;
      }
    });
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell;
          if(k == 'sapid'){
             cell = row.sapid
          }
          else if(k == 'leaveholidayhours'){
             cell = row.leaveholidayhours
          }
          else if(k == 'name'){
             cell = row.name
          }
          else if(k == 'projecthours'){
             cell = row.projecthours
          }
          else if(k == 'noonshifts'){
             cell = row.noonshifts
          }
          else if(k == 'nightshifts'){
             cell = row.nightshifts
          }
          else if(k == 'taeligibledays'){
             cell = row.taeligibledays
          }
          else if(k == 'transportationallowance'){
             cell = row.transportationallowance
          }
          else if(k == 'totalallowance'){
             cell = row.totalallowance
          }
          // cell = cell instanceof Date
          //   ? cell.toLocaleString()
          //   : cell.toString().replace(/"/g, '""');
          // if (cell.search(/("|,|\n)/g) >= 0) {
          //   cell = `"${cell}"`;
          // }
          return cell;
        }).join(separator);
      }).join('\n');
    return this.saveAsFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
  }
  getDataOf(){
    console.log(JSON.stringify(this.listOfProjects))
  }
  post(){
    this.projectService.postAllProjects(this.listOfProjects).subscribe();
  }
}
