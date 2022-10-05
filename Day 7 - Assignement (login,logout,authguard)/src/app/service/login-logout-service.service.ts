import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutServiceService {

  apiUrl : string = "http://localhost:9000/users";
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*');
  
  constructor(private _httpClient : HttpClient) { }

  getUsers(): Observable<any>{
    return this._httpClient.get(this.apiUrl,{headers: this.headers});
  }

  registerUser(user : User){
    return this._httpClient.post(`${this.apiUrl}/create`, user, {headers: this.headers});
  }


}
