import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
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
    if (this.token && this.role == "2") {
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

  setNumCuenta(numCuenta: string): void {
    // Guardar el numCuenta en el almacenamiento
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('numCuenta', numCuenta);
    }
  }

  getNumCuenta(): string | null {
    // Obtener el numCuenta del almacenamiento
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('numCuenta');
    }
    else {
      return null;
    }
  }

  setIdTarjeta(idTarjeta: string): void {
    // Guardar el idTarjeta en el almacenamiento
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('idTarjeta', idTarjeta);
    }
  }

  getIdTarjeta(): string | null {
    // Obtener el idTarjeta del almacenamiento
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('idTarjeta');
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
      localStorage.removeItem('idCuenta');
      localStorage.removeItem('numCuenta');
      localStorage.removeItem('idTarjeta');
    }

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}