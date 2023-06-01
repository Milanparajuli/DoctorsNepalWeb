import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticate: boolean = false;
  apiUrlEndPoint: string = 'users/login';
  logoutEndpoint: string = 'users/logout';
  baseUrl: string = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  isLoggedIn(){
    return !! localStorage.getItem('userId');
  }

  login(login: any): Observable<any> {
    console.log(login);
    return this.httpClient.post<any>(
      this.baseUrl.concat(this.apiUrlEndPoint),
      login
    );
  }

  logout(logoutRequest: any): Observable<any> {
    console.log('auth service called');
    return this.httpClient.post<any>(
      this.baseUrl.concat(this.logoutEndpoint),
      logoutRequest
    );
  }
}
