import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiEndPoint: string = 'users';
  apiLoginEndPoing: string = 'users/login';
  apiByIdEndPoint: string = 'users/by-id';
  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  addUser(user: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl.concat(this.apiEndPoint),
      user
    );
  }

  getUser(): Observable<any> {
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

  addAppointment(appointment: any, patientId: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl.concat('appointment'),
      appointment,patientId
    );
  }

  getTwoPoint(startLat: any, startLon: any, endLat: any, endLon: any) {
    return this.httpClient.get<any>(
      environment.doctorBaseUrl.concat('distance/haversine'),
      {
        params: {
          startLat: startLat,
          startLon: startLon,
          endLat: endLat,
          endLon: endLon
        },
      })
  }
}
