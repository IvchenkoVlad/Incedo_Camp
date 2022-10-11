import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl : string = "http://localhost:8080/api/user"; //
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*');
  
  constructor(private _httpClient : HttpClient) { }

  getUsers(): Observable<any>{
  return this._httpClient.get(this.apiUrl,{headers: this.headers});
  }

  //post request to add user object to DB
  addUser(user : User){
    return this._httpClient.post(this.apiUrl, user, {headers: this.headers});
  }
  
  registerUser(user : User){
    return this._httpClient.post(this.apiUrl, user, {headers: this.headers});
  }

  updateRoleStatus(user : User){
    return this._httpClient.put(`${this.apiUrl}/update`, user, {headers: this.headers});
  }

}


/*
apiUrl : string = "http://localhost:3001/users"; //
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*');
  
  constructor(private _httpClient : HttpClient) { }

  getUsers(): Observable<any>{
  return this._httpClient.get(this.apiUrl,{headers: this.headers});
  }

  //post request to add user object to DB
  addUser(user : User){
    return this._httpClient.post(this.apiUrl+'/create', user, {headers: this.headers});
  }
  
  registerUser(user : User){
    return this._httpClient.post(`${this.apiUrl}/create`, user, {headers: this.headers});
  }

  updateRoleStatus(user : User){
    return this._httpClient.put(`${this.apiUrl}/update`, user, {headers: this.headers});
  } 
*/
