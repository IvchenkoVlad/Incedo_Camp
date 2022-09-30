import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  apiUrl : string = "http://localhost:7000/users";
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*');

  constructor(private httpClient:HttpClient) { }
  //GETTING ALL USERS
  getUsers(): Observable<any>{
    return this.httpClient.get(this.apiUrl+'/list',{headers: this.headers});
  }
  //ADDING USER 
  addUser(user : User): Observable<any> {
    return this.httpClient.post(this.apiUrl+'/create', user,{headers: this.headers})
  }
  //DELETING USER BY ID
  deleteUser(id:number){
    return this.httpClient.delete(this.apiUrl+'/delete/'+id, {headers: this.headers})
  }
  //GETTING SINGLE USER BY ID
  getUserById(id:number) : Observable<any>{
    return this.httpClient.get(this.apiUrl+'/get/'+id,{headers: this.headers});
  }
  //UPDATING BY ID
  updateUserById(user:User){
    return this.httpClient.put(this.apiUrl+'/update/'+user.id, user, {headers: this.headers});
  }
}
