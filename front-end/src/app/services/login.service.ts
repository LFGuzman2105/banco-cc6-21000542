import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private APP_DOMAIN: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.APP_DOMAIN = "https://backend-bancocc6-761339442076.us-central1.run.app"
    // this.APP_DOMAIN = 'http://localhost:3000';
    // this.APP_DOMAIN = 'http://26.92.101.252:3000';
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.APP_DOMAIN}/login`, {username, password}, {headers: this.headers});
  }
}