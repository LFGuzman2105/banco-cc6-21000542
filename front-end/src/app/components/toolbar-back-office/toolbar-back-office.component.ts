import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router,  RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardBackOfficeService } from '../../services/auth-guard-back-office.service';

@Component({
  selector: 'app-toolbar-back-office',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, HttpClientModule, RouterModule],
  templateUrl: './toolbar-back-office.component.html',
  styleUrl: './toolbar-back-office.component.css',
  providers: [ClienteService]
})
export class ToolbarBackOfficeComponent {
  id_cliente: string | null;
  nombreCliente: string | null;

  constructor(private router: Router, private clienteService: ClienteService, private authService: AuthGuardBackOfficeService) {
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