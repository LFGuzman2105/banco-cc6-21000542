import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToolbarBackOfficeComponent } from '../toolbar-back-office/toolbar-back-office.component';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { AuthGuardBackOfficeService } from '../../services/auth-guard-back-office.service';
import { CuentaService } from '../../services/cuenta.service';
import { ClienteService } from '../../services/cliente.service';
import { TransaccionService } from '../../services/transaccion.service';

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [ToolbarBackOfficeComponent, FormsModule, CommonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, 
    HttpClientModule, MatSelectModule, MatCardModule, MatRadioModule],
  templateUrl: './caja.component.html',
  styleUrl: './caja.component.css',
  providers: [AuthGuardBackOfficeService, CuentaService, ClienteService, TransaccionService]
})
export class CajaComponent {
  @ViewChild('inputCuentaDest') inputCuentaDest!: ElementRef;

  id_cuenta: string | null;
  nombre_cuenta: string;
  tipo_cuenta: string;
  id_cliente: string;
  isReadOnly: boolean; // Variable para controlar si el campo es readonly
  
  num_cuenta: string;
  id_operacion: number;
  monto: string;
  nombreCliente: string;
  descripcion: string;

  constructor(private _snackBar: MatSnackBar, private authGuardService: AuthGuardBackOfficeService, private cuentaService: CuentaService, private clienteService: ClienteService, private transaccionService: TransaccionService) {
    this.id_cuenta= "";
    this.nombre_cuenta = "";
    this.tipo_cuenta = "";
    this.isReadOnly = false;
    this.id_cliente = this.authGuardService.getIdCliente() || "";
    
    this.num_cuenta = "";
    this.monto = "";
    this.nombreCliente = "";
    this.descripcion = "";
    this.id_operacion = 0;
  }

  onInputChange(event: any): void {
    let inputValue = event?.target?.value || ''; 

    if (inputValue.length === 13) {
      this.num_cuenta = inputValue;
      this.isReadOnly = true; // Hacemos el campo readonly
      
      this.cuentaService.getCuentaDestino(this.num_cuenta).subscribe(response => {
        if (response.status == 0) {
          this.id_cuenta = "";

          this._snackBar.open(response.mensaje, 'Cerrar', {
            duration: 5000,
          });
        }
        else {
          this.id_cuenta = response.data[0].id_cuenta_destino;
          this.nombre_cuenta = response.data[0].nombre1 + " " + response.data[0].nombre2 + " " + response.data[0].apellido1 + " " + response.data[0].apellido2;
          this.tipo_cuenta = response.data[0].tipo_cuenta;
        }
      });
    }
  }

  // Método para limpiar el campo y habilitarlo nuevamente
  limpiarCuenta() {
    const input = document.getElementById('num_cuenta') as HTMLInputElement;

    if (input) {
      input.value = ''; // Limpiamos el valor del input
      this.num_cuenta = ''; // Limpiamos el valor del input
      this.id_cuenta = ''; // Limpiamos el valor del input
      this.isReadOnly = false; // Lo habilitamos nuevamente
    }
  }

  transferir() {
    if (this.num_cuenta === "" || this.id_operacion === 0) {
      this._snackBar.open('Debe ingresar un tipo de transacción y una cuenta', 'Cerrar', {
        duration: 5000,
      });
    }
    else {
      if (this.id_cliente) {
        this.clienteService.getNombreCliente(this.id_cliente).subscribe((response) => {
          this.nombreCliente = response.nombreCliente;

          if (this.monto == null) {
            this._snackBar.open('El monto no puede estar vacío o el valor es incorrecto', 'Cerrar', {
              duration: 5000,
            });
          }
          else {
            this.monto = this.monto.toString();
            const regex = /^([0-9]{1,10}(\.[0-9]{1,2})?)$/g;

            if (this.monto.includes('+') || this.monto.includes('-')) {
              this.monto = this.monto.replace('+', '');
              this.monto = this.monto.replace('-', '');
            }

            let verificacion = regex.test(this.monto);

            if (verificacion == false) {
              this._snackBar.open('El monto debe ser un número maximo de 10 enteros y tener un máximo de dos decimales', 'Cerrar', {
                duration: 5000,
              });
            }
            else {
              this.monto = parseFloat(this.monto).toFixed(2).toString();

              if (this.id_operacion == 1) {
                this.transaccionService.realizarDeposito(this.num_cuenta, this.id_operacion, parseFloat(this.monto), this.descripcion).subscribe(responseTransaccion => {
                  this._snackBar.open(responseTransaccion.body, 'Cerrar', {
                    duration: 5000,
                  });

                  if (responseTransaccion.status == 201) {
                    this.limpiarCampos();
                  }
                });
              }
              else {
                this.transaccionService.realizarRetiro(this.num_cuenta, this.id_operacion, parseFloat(this.monto), this.descripcion).subscribe(responseTransaccion => {
                  this._snackBar.open(responseTransaccion.body, 'Cerrar', {
                    duration: 5000,
                  });

                  if (responseTransaccion.status == 201) {
                    this.limpiarCampos();
                  }
                });
              }
            }
          }
        });
      }
    }
  }

  limpiarCampos() {
    this.limpiarCuenta();
    this.id_cuenta = "";
    this.monto = "";
    this.descripcion = "";
    this.id_operacion = 0;
    this.isReadOnly = false;
  }
}