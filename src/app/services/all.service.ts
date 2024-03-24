import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseApi } from '../interfaces';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AllService {
  private urlApi: string = 'https://express-api-lej2.onrender.com/';

  constructor(private http: HttpClient) {}

  pacientes(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}pacientes`);
  }
  medicamentos(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}medicamentos`);
  }
  medicos(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}medicos`);
  }
  almacen(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}almacen`);
  }
  salas(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}salas`);
  }
  camas(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}ListadoCamas`);
  }
  camaFiltradas(idSala: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}camaFiltradas/${idSala}`);
  }
}
