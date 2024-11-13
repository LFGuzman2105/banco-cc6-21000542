import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardBackOfficeService implements CanActivate {
  private token: string | null;
  private role: string | null;
  
  constructor(private router: Router) { 
    if (this.isLocalStorageAvailable()) {
      this.token = localStorage.getItem('token');
      this.role = localStorage.getItem('role');
    }
    else {
      this.token = null;
      this.role = null;
    }
  }

  isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  canActivate(): boolean {
    // Verificar si el token existe en localStorage
    if (this.token && this.role == "1") {
      // Si el token existe, permitir el acceso a la ruta
      return true;
    } 
    else {
      // Si no hay token, redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/login-back-office']);
      return false;
    }
  }

  setToken(token: string): void {
    // Guardar el token en el almacenamiento
    this.token = token;

    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('token', token);
    }
  }

  setRole(role: string): void {
    // Guardar el role en el almacenamiento
    this.role = role.toString();

    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('role', role.toString());
    }
  }

  setIdCliente(idCliente: string): void {
    // Guardar el idCliente en el almacenamiento
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('idCliente', idCliente);
    }
  }

  getIdCliente(): string | null {
    // Obtener el idCliente del almacenamiento
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('idCliente');
    }
    else {
      return null;
    }
  }

  logout(): void {
    // Eliminar el token del almacenamiento
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('idCliente');
    }

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login-back-office']);
  }
}
