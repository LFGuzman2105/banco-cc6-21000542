import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private token: string | null;
  
  constructor(private router: Router) { 
    if (this.isLocalStorageAvailable()) {
      this.token = localStorage.getItem('token');
    }
    else {
      this.token = null;
    }
  }

  isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  canActivate(): boolean {
    // Verificar si el token existe en localStorage
    if (this.token) {
      // Si el token existe, permitir el acceso a la ruta
      return true;
    } 
    else {
      // Si no hay token, redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/login']);
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

  setIdCuenta(idCuenta: string): void {
    // Guardar el idCuenta en el almacenamiento
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('idCuenta', idCuenta);
    }
  }

  getIdCuenta(): string | null {
    // Obtener el idCuenta del almacenamiento
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('idCuenta');
    }
    else {
      return null;
    }
  }

  logout(): void {
    // Eliminar el token del almacenamiento
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
      localStorage.removeItem('idCliente');
      localStorage.removeItem('idCuenta');
    }

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}