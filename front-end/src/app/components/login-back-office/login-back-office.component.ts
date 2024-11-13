import { Component } from '@angular/core';
import { FormsModule}  from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { AuthGuardBackOfficeService } from '../../services/auth-guard-back-office.service';

@Component({
  selector: 'app-login-back-office',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, HttpClientModule],
  templateUrl: './login-back-office.component.html',
  styleUrl: './login-back-office.component.css',
  providers: [LoginService, AuthGuardBackOfficeService]
})
export class LoginBackOfficeComponent {
  username: string;
  password: string;
  hide: boolean;
  

  constructor(private snackBar: MatSnackBar, private router: Router, private loginService: LoginService, private authGuardService: AuthGuardBackOfficeService) {
    this.username = "";
    this.password = "";
    this.hide = true;
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  login() {
    if (this.username == "" || this.password == "") {
      this.snackBar.open("Debe llenar todos los campos", 'Cerrar', {
        duration: 5000,
      });
    }
    else {
      this.loginService.login(this.username, this.password).subscribe(
        (response) => {
          if (response.status == 0) {
            this.snackBar.open(response.mensaje, 'Cerrar', {
              duration: 5000,
            });
          }
          else {
            if (response.role_id == 2) {
              this.snackBar.open("No tiene permisos para acceder a esta aplicación.", 'Cerrar', {
                duration: 5000,
              });
            }
            else {
              this.authGuardService.setToken(response.token);
              this.authGuardService.setRole(response.role_id);
              this.authGuardService.setIdCliente(response.id_cliente);
              this.router.navigate(['/caja']);
            }
          }
        }
      );
    }
  }
}