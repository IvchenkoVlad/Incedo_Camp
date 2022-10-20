import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiUrl: string = "http://localhost:8080/api/project"; //
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');

  constructor(private _httpClient: HttpClient) { }

  getAllProjects(): Observable<any> {
    return this._httpClient.get(this.apiUrl, { headers: this.headers });
  }

  getProjectsByDate(from: string, to: string) : Observable<any>{
    return this._httpClient.get(this.apiUrl+'/projects/dateRange/'+from+"/"+to);
  }

  getProjectsByArea(areaID: number): Observable<any> {
    return this._httpClient.get(this.apiUrl + "/projectsByArea/" + areaID, { headers: this.headers });
  }

  getAreas(): Observable<any> {
    return this._httpClient.get('http://localhost:8080/api/area', { headers: this.headers });
  }

  postAllProjects(projects : Project[]){
    return this._httpClient.post('http://localhost:8080/api/project/projects/insertMany', projects, {headers: this.headers});
  }

}
