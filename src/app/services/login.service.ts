import { Injectable } from '@angular/core';
import { login } from '../Interface/ILogin';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlApiProduction: string = 'http://mobilsaas.somee.com/api/user/';
  private urlApiDeveloper: string = 'http://localhost:5139/api/Patients/';

  constructor(private http: HttpClient) {}

  Login(model:login): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApiProduction}login` , model);
  }
}
