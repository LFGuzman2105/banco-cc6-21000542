import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthGuardService } from '../../services/auth-guard.service';
import { CuentaService } from '../../services/cuenta.service';

@Component({
  selector: 'app-solicitar-cuenta',
  standalone: true,
  imports: [ToolbarComponent, MatSelectModule, MatFormFieldModule, MatInputModule, HttpClientModule, MatButtonModule, MatIconModule],
  templateUrl: './solicitar-cuenta.component.html',
  styleUrl: './solicitar-cuenta.component.css',
  providers: [AuthGuardService, CuentaService]
})
export class SolicitarCuentaComponent {
  id_cliente: string | null;
  id_tipo_cuenta: number;

  constructor(private authService: AuthGuardService, private cuentaService: CuentaService, private snackBar: MatSnackBar) {
    this.id_cliente = this.authService.getIdCliente();
    this.id_tipo_cuenta = 0;
  }

  registrarCuenta() {
    if (this.id_tipo_cuenta == 0) {
      this.snackBar.open('Por favor, seleccione un tipo de cuenta.', 'Cerrar', {
        duration: 5000,
      });
    }
    else {
      if (this.id_cliente) {
        this.cuentaService.solicitarCuenta(this.id_cliente, this.id_tipo_cuenta).subscribe((response) => {
          if (response.status == 0) {
            this.snackBar.open(response.mensaje, 'Cerrar', {
              duration: 5000,
            });
          }
          else {
            this.snackBar.open(response.mensaje + " No. de cuenta: " + response.num_cuenta, 'Cerrar', {
              duration: 5000,
            });
          }
        });
      }
    }
  }
}