import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _httpClient: HttpClient) {}
  sendRenewalMessage(user : User) {
    return this._httpClient.post("http://localhost:3000/mailapi/renewal", user);
  }
  sendAdminNotifyMessage(user : User) {
    return this._httpClient.post("http://localhost:3000/mailapi/adminnotify", user);
  }
  sendUserNotifyMessage(user : User) {
    return this._httpClient.post("http://localhost:3000/mailapi/usernotify", user);
  }
}
