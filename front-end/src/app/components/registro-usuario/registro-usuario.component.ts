import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, 
           MatDatepickerModule, MatRadioModule, RouterModule, HttpClientModule],
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.css',
  providers: [provideNativeDateAdapter(), ClienteService]
})
export class RegistroUsuarioComponent {
  errorMessage: string;
  hide: boolean;
  dpi: string;
  nombre1: string;
  nombre2: string;
  nombre3: string;
  apellido1: string;
  apellido2: string;
  apellido3: string;
  fecha_nacimiento: string;
  username: string;
  email: FormControl;
  contrasena: string;
  id_tipo_cuenta: number;

  constructor(private snackBar: MatSnackBar, private clienteService: ClienteService) {
    this.errorMessage = '';
    this.hide = true;
    this.dpi = '';
    this.nombre1 = '';
    this.nombre2 = "";
    this.nombre3 = "";
    this.apellido1 = '';
    this.apellido2 = '';
    this.apellido3 = "";
    this.fecha_nacimiento = '';
    this.username = '';
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.contrasena = '';
    this.id_tipo_cuenta = 0;

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'Debe ingresar un correo electrónico.';
    } 
    else if (this.email.hasError('email')) {
      this.errorMessage = 'No es un correo electrónico válido.';
    } 
    else {
      this.errorMessage = '';
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  limpiar() {
    this.email.setValue('');
  }

  registrar() {
    this.dpi = this.dpi.toString();

    if (this.dpi == '' || this.nombre1 == '' || this.apellido1 == '' || this.fecha_nacimiento == '' || this.username == '' 
      || this.email.invalid || this.contrasena == '' || this.id_tipo_cuenta == 0) {
      this.snackBar.open('Por favor, llene todos los campos.', 'Cerrar', {
        duration: 5000,
      });
    }
    else if (this.dpi.length != 13 || this.nombre1.length > 20 || this.nombre2.length > 20 || this.nombre3.length > 20 || this.apellido1.length > 20 || this.apellido2.length > 20 
      || this.apellido3.length > 20 || this.username.length > 20 || this.contrasena.length > 30 || this.email.value.length > 30) {
      this.snackBar.open('Los campos introducidos son incorrectos.', 'Cerrar', {
        duration: 5000,
      });
    }  
    else {
      this.clienteService.registrarClienteUsuario(this.dpi, this.nombre1, this.nombre2, this.nombre3, this.apellido1, this.apellido2, this.apellido3, this.fecha_nacimiento, 
                                                  this.username, this.email.value, this.contrasena, this.id_tipo_cuenta).subscribe((response) => {
          this.snackBar.open(response.mensaje, 'Cerrar', {
            duration: 5000,
          });

          if(response.status == 1) {
            this.limpiarCampos();
          }
      });
    }
  }

  limpiarCampos() {
    this.dpi = '';
    this.nombre1 = '';
    this.nombre2 = "";
    this.nombre3 = "";
    this.apellido1 = '';
    this.apellido2 = '';
    this.apellido3 = "";
    this.fecha_nacimiento = '';
    this.username = '';
    this.email.setValue('');
    this.contrasena = '';
    this.id_tipo_cuenta = 0;
  }
}