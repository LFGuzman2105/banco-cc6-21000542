import { Component } from '@angular/core';
import { FormsModule}  from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { AuthGuardService } from '../../services/auth-guard.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService, AuthGuardService]
})
export class LoginComponent {
  username: string;
  password: string;
  hide: boolean;
  

  constructor(private snackBar: MatSnackBar, private router: Router, private loginService: LoginService, private authGuardService: AuthGuardService) {
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
            this.authGuardService.setToken(response.token);
            this.authGuardService.setIdCliente(response.id_cliente);
            this.router.navigate(['/estadoCuenta']);
          }
        }
      );
    }
  }
}