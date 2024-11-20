import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
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
import { AuthGuardService } from '../../services/auth-guard.service';
import { CuentaService } from '../../services/cuenta.service';
import { ClienteService } from '../../services/cliente.service';
import { TransaccionService } from '../../services/transaccion.service';

@Component({
  selector: 'app-transferencias',
  standalone: true,
  imports: [ToolbarComponent, FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, HttpClientModule, MatSelectModule, CommonModule, MatCardModule],
  templateUrl: './transferencias.component.html',
  styleUrl: './transferencias.component.css',
  providers: [AuthGuardService, CuentaService, ClienteService, TransaccionService]
})
export class TransferenciasComponent {
  @ViewChild('inputCuentaDest') inputCuentaDest!: ElementRef;

  id_cuenta_debito: string | null;
  id_cuenta_destino: string | null;
  nombre_cuenta_destino: string;
  tipo_cuenta_destino: string;
  cuentas_cliente: any;
  id_cliente: string;
  isReadOnly: boolean; // Variable para controlar si el campo es readonly
  
  num_cuenta_destino: string;
  num_cuenta_origen: string;
  monto: string;
  nombreCliente: string;
  descripcion: string;

  constructor(private _snackBar: MatSnackBar, private authGuardService: AuthGuardService, private cuentaService: CuentaService, private clienteService: ClienteService, private transaccionService: TransaccionService) {
    this.id_cuenta_debito= "";
    this.id_cuenta_destino = "";
    this.nombre_cuenta_destino = "";
    this.tipo_cuenta_destino = "";
    this.isReadOnly = false;
    this.id_cliente = this.authGuardService.getIdCliente() || "";
    
    this.num_cuenta_destino = "";
    this.num_cuenta_origen = "";
    this.monto = "";
    this.nombreCliente = "";
    this.descripcion = "";

    this.getCuentasCliente();
  }

  onInputChange(event: any): void {
    let inputValue = event?.target?.value || ''; 

    if (inputValue.length === 13) {
      this.num_cuenta_destino = inputValue;
      this.isReadOnly = true; // Hacemos el campo readonly
      
      this.cuentaService.getCuentaDestino(this.num_cuenta_destino).subscribe(response => {
        if (response.status == 0) {
          this._snackBar.open(response.mensaje, 'Cerrar', {
            duration: 5000,
          });
        }
        else {
          this.id_cuenta_destino = response.data[0].id_cuenta_destino;
          this.nombre_cuenta_destino = response.data[0].nombre1 + " " + response.data[0].nombre2 + " " + response.data[0].apellido1 + " " + response.data[0].apellido2;
          this.tipo_cuenta_destino = response.data[0].tipo_cuenta;
        }
      });
    }
  }

  // Método para limpiar el campo y habilitarlo nuevamente
  limpiarCuentaDestino() {
    const input = document.getElementById('num_cuenta_destino') as HTMLInputElement;

    if (input) {
      input.value = ''; // Limpiamos el valor del input
      this.num_cuenta_destino = ''; // Limpiamos el valor del input
      this.id_cuenta_destino = ''; // Limpiamos el valor del input
      this.isReadOnly = false; // Lo habilitamos nuevamente
    }
  }

  transferir() {
    if (this.num_cuenta_origen === "" || this.id_cuenta_destino === "") {
      this._snackBar.open('Debe seleccionar una cuenta de débito y una cuenta de destino', 'Cerrar', {
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

              this.transaccionService.realizarTransferencia(this.num_cuenta_destino, this.num_cuenta_origen, 2, parseFloat(this.monto), 
                this.nombreCliente + " - No. Cuenta " + this.num_cuenta_origen, this.descripcion).subscribe(responseTransaccion => {

                this._snackBar.open(responseTransaccion.body, 'Cerrar', {
                  duration: 5000,
                });

                if (responseTransaccion.status == 201) {
                  this.getCuentasCliente();
                  this.limpiarCampos();
                }
              });
            }

          }
        });
      }
    }
  }

  getCuentasCliente() {
    this.cuentaService.getCuentas(this.id_cliente).subscribe(response => {
      this.cuentas_cliente = response.data;
    });
  }

  limpiarCampos() {
    this.limpiarCuentaDestino();
    this.num_cuenta_origen = "";
    this.id_cuenta_destino = "";
    this.monto = "";
    this.descripcion = "";
    this.isReadOnly = false;
  }
}