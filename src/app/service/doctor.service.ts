import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  doctorBaseUrl: string = environment.doctorBaseUrl;

  doctorSearch: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  afterLogin: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) {
  }

  getDoctorSearch() {
    return this.doctorSearch.asObservable();
  }

  setDoctorSearch(data: any) {
    this.doctorSearch.next(data);
  }

  getAfterLogin() {
    return this.afterLogin.asObservable();
  }

  setAfterLogin(data: any) {
    this.afterLogin.next(data);
  }


  getDoctor(): Observable<any> {
    return this.httpClient.get<any>(this.doctorBaseUrl.concat("get-identity"));
  }

  getDoctorByName(name: any): Observable<any> {
    return this.httpClient.get<any>(this.doctorBaseUrl.concat("identity-by-address").concat('/' + name));
  }
  getDoctorBySpeciality(speciality: any): Observable<any> {
    return this.httpClient.get<any>(this.doctorBaseUrl.concat("identity-by-speciality").concat('/' + speciality));
  }

  saveIdentities() {
    return this.httpClient.get<any>(this.doctorBaseUrl.concat('saveIdentity'));
  }
}
