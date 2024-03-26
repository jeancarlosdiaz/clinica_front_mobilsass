import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApi } from '../interfaces';
import { Observable } from 'rxjs';
import { Paciente } from '../Interface/IPatient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private urlApiProduction: string = 'http://mobilsaas.somee.com/api/Patients/';
  private urlApiDeveloper: string = 'http://localhost:5139/api/Patients/';

  constructor(private http: HttpClient) {}

  List(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApiProduction}List`);
  }
  
  Delete(obj:any): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApiProduction}Delete` , obj);
  }
  
  Register(model:Paciente): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApiProduction}Register` , model);
  }
  Editar(model:Paciente): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApiProduction}Editar` , model);
  }
}

