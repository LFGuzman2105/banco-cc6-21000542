import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private APP_DOMAIN: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    // this.APP_DOMAIN = 'http://localhost:3000';
    this.APP_DOMAIN = 'http://26.92.101.252:3000';
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  getNombreCliente(id_cliente: string): Observable<any> {
    return this.http.post(`${this.APP_DOMAIN}/nombreCliente`, {id_cliente}, {headers: this.headers});
  }

  registrarClienteUsuario(dpi: string, nombre1: string, nombre2: string, nombre3: string, apellido1: string, apellido2: string, apellido3: string, fecha_nacimiento: string
                          , username: string, email: string, password: string, id_tipo_cuenta: number): Observable<any> {
    return this.http.post(`${this.APP_DOMAIN}/registrarClienteUsuario`, {dpi, nombre1, nombre2, nombre3, apellido1, apellido2, apellido3, fecha_nacimiento, username, email, 
                                                                        password, id_tipo_cuenta}, {headers: this.headers});
  }
}