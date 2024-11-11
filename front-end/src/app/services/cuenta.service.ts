import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private APP_DOMAIN: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    // this.APP_DOMAIN = 'http://localhost:3000';
    this.APP_DOMAIN = 'http://26.92.101.252:3000';
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  getCuentas(id_cliente: string): Observable<any> {
    return this.http.post(`${this.APP_DOMAIN}/cuentas`, {id_cliente}, {headers: this.headers});
  }
}
