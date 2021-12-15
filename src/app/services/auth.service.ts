import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessTokenModel } from '../models/accessTokenModel';
import { ItemResponseModel } from '../models/itemResponseModel';
import { LoginCreds } from '../models/loginCreds';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44339/api/auth/';
  constructor(private httpClient: HttpClient) {}
  
  login(loginCreds: LoginCreds): Observable<ItemResponseModel<AccessTokenModel>> {
    return this.httpClient.post<ItemResponseModel<AccessTokenModel>>(this.apiUrl + "login", loginCreds);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("accessToken") != null;
  }

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }
  
  setAccessToken(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
  }
}
