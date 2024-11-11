import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router,  RouterModule } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard.service';
import { ClienteService } from '../../services/cliente.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, HttpClientModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  providers: [ClienteService]
})
export class ToolbarComponent {
  id_cliente: string | null;
  nombreCliente: string | null;

  constructor(private router: Router, private authService: AuthGuardService, private clienteService: ClienteService) {
    this.id_cliente = this.authService.getIdCliente();
    this.nombreCliente = "";

    this.nombresApellidosCliente();
  }

  nombresApellidosCliente() {
    if (this.id_cliente) {
      this.clienteService.getNombreCliente(this.id_cliente).subscribe((response) => {
        this.nombreCliente = response.nombreCliente;
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}