import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiEndPoint: string = 'users';
  apiLoginEndPoing: string = 'users/login';
  apiByIdEndPoint: string = 'users/by-id';
  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  addUser(user: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl.concat(this.apiEndPoint),
      user
    );
  }

  getUser(user: any): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl.concat(this.apiEndPoint));
  }

  login(login: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl.concat(this.apiLoginEndPoing),
      login
    );
  }

  getUserById(id: any): Observable<any> {
    return this.httpClient.get<any>(
      this.baseUrl.concat(this.apiByIdEndPoint).concat('/' + id)
    );
  }
}
