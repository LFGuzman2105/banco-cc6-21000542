import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { AuthGuardService } from '../../services/auth-guard.service';
import { ClienteService } from '../../services/cliente.service';
import { CuentaService } from '../../services/cuenta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estado-cuenta',
  standalone: true,
  imports: [ToolbarComponent, FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatDatepickerModule, HttpClientModule, MatSelectModule, CommonModule],
  templateUrl: './estado-cuenta.component.html',
  styleUrl: './estado-cuenta.component.css',
  providers: [AuthGuardService, ClienteService, CuentaService]
})
export class EstadoCuentaComponent {
  id_cliente: string | null;
  nombreCliente: string | null;
  cantidad_cuentas: number | null;
  totalSaldo: number | null;
  cuentas: any;

  constructor(private authService: AuthGuardService, private clienteService: ClienteService, private cuentaService: CuentaService, private router: Router) {
    this.id_cliente = this.authService.getIdCliente();
    this.nombreCliente = "";
    this.cantidad_cuentas = 0;
    this.totalSaldo = 0;

    this.nombresApellidosCliente();
    this.getDatosCuentas();
  }

  nombresApellidosCliente() {
    if (this.id_cliente) {
      this.clienteService.getNombreCliente(this.id_cliente).subscribe((response) => {
        this.nombreCliente = response.nombreCliente;
      });
    }
  }

  getDatosCuentas() {
    if (this.id_cliente) {
      this.cuentaService.getCuentas(this.id_cliente).subscribe((response) => {
        this.cuentas = response.data;
        this.cantidad_cuentas = response.data.length;
        
        for (let i = 0; i < response.data.length; i++) {
          this.totalSaldo += response.data[i].saldo;
        }
      });
    }
  }

  verMovimientos(id_cuenta: string) {
    this.authService.setIdCuenta(id_cuenta);
    this.router.navigate(['/movimientosTransacciones']);
  }
}