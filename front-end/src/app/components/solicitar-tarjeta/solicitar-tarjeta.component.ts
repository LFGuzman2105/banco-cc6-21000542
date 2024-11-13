import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthGuardService } from '../../services/auth-guard.service';
import { CuentaService } from '../../services/cuenta.service';
import { TarjetaService } from '../../services/tarjeta.service';

@Component({
  selector: 'app-solicitar-tarjeta',
  standalone: true,
  imports: [ToolbarComponent, MatSelectModule, MatFormFieldModule, MatInputModule, HttpClientModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './solicitar-tarjeta.component.html',
  styleUrl: './solicitar-tarjeta.component.css',
  providers: [AuthGuardService, CuentaService, TarjetaService]
})
export class SolicitarTarjetaComponent {
  id_cliente: string;
  id_cuenta: string;
  id_marca_tarjeta: number;
  id_categoria_tarjeta: number;
  cuentas_cliente: any;

  constructor(private authGuardService: AuthGuardService, private cuentaService: CuentaService, private snackBar: MatSnackBar, private tarjetaService: TarjetaService) {
    this.id_cliente = this.authGuardService.getIdCliente() || "";
    this.id_cuenta = "";
    this.id_marca_tarjeta = 0;
    this.id_categoria_tarjeta = 0;

    this.cuentaService.getCuentas(this.id_cliente).subscribe(response => {
      this.cuentas_cliente = response.data;
    });
  }

  solicitarTarjeta() {
    this.tarjetaService.getSolicitarTarjeta(this.id_marca_tarjeta, this.id_categoria_tarjeta, this.id_cliente, this.id_cuenta).subscribe(response => {
      this.snackBar.open(response.mensaje, 'Cerrar', {
        duration: 5000,
      });

      if (response.status == 1) {
        this.id_cuenta = "";
        this.id_marca_tarjeta = 0;
        this.id_categoria_tarjeta = 0;
      }
    });
  }
}