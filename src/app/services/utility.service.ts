import { Injectable } from '@angular/core';
import { ResponseApi } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private urlApiProduction: string = 'http://mobilsaas.somee.com/api/Utility/';
  private urlApiDeveloper: string = 'http://localhost:5139/api/Utility/';

  constructor(private http: HttpClient) {}

  LisMunicipality(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApiProduction}LisMunicipality`);
  }
  ListDepartment(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApiProduction}ListDepartment`);
  }
}
