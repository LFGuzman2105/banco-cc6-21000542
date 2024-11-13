import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private APP_DOMAIN: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    // this.APP_DOMAIN = 'http://localhost:3000';
    this.APP_DOMAIN = 'http://26.92.101.252:3000';
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  getMovimientosTransacciones(id_cuenta: string, id_cliente: string): Observable<any> {
    return this.http.post(`${this.APP_DOMAIN}/movimientosTransacciones`, {id_cuenta, id_cliente}, {headers: this.headers});
  }

  realizarTransferencia(num_cuenta_destino: string, num_cuenta_origen: string, tipo_transaccion: number, monto: number, nombre_origen: string, descripcion: string): Observable<any> {
    return this.http.post(`${this.APP_DOMAIN}/transaccion/cuenta`, {num_cuenta_destino, num_cuenta_origen, tipo_transaccion, monto, nombre_origen, descripcion}, {headers: this.headers});
  }

  realizarDeposito(num_cuenta_origen: string, tipo_transaccion: number, monto: number, descripcion: string): Observable<any> {
    const num_cuenta_destino = null;
    const nombre_origen = "Depósito de Caja";

    return this.http.post(`${this.APP_DOMAIN}/transaccion/cuenta`, {num_cuenta_destino, num_cuenta_origen, tipo_transaccion, monto, nombre_origen, descripcion}, {headers: this.headers});
  }

  realizarRetiro(num_cuenta_origen: string, tipo_transaccion: number, monto: number, descripcion: string): Observable<any> {
    const num_cuenta_destino = null;
    const nombre_origen = "Retiro de Caja";
    
    return this.http.post(`${this.APP_DOMAIN}/transaccion/cuenta`, {num_cuenta_destino, num_cuenta_origen, tipo_transaccion, monto, nombre_origen, descripcion}, {headers: this.headers});
  }
}