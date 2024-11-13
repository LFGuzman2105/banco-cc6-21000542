import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private APP_DOMAIN: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    // this.APP_DOMAIN = 'http://localhost:3000';
    this.APP_DOMAIN = 'http://26.92.101.252:3000';
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  getSolicitarTarjeta(id_marca_tarjeta: number, id_categoria_tarjeta: number, id_cliente_tarjeta: string, id_ref_cuenta: string): Observable<any> {
    return this.http.post(`${this.APP_DOMAIN}/solicitarTarjeta`, {id_marca_tarjeta, id_categoria_tarjeta, id_cliente_tarjeta, id_ref_cuenta}, {headers: this.headers});
  }

  getDatosTarjeta(id_cuenta: string): Observable<any> {
    return this.http.post(`${this.APP_DOMAIN}/datosTarjeta`, {id_cuenta}, {headers: this.headers});
  }
}