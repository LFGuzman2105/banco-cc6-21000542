import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { EstadoCuentaComponent } from './components/estado-cuenta/estado-cuenta.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { SolicitarTarjetaComponent } from './components/solicitar-tarjeta/solicitar-tarjeta.component';
import { TransferenciasComponent } from './components/transferencias/transferencias.component';
import { MovimientosTransaccionesComponent } from './components/movimientos-transacciones/movimientos-transacciones.component';
import { SolicitarCuentaComponent } from './components/solicitar-cuenta/solicitar-cuenta.component';
import { AuthGuardBackOfficeService } from './services/auth-guard-back-office.service';
import { LoginBackOfficeComponent } from './components/login-back-office/login-back-office.component';
import { CajaComponent } from './components/caja/caja.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registroUsuario', component: RegistroUsuarioComponent },
    { path: 'estadoCuenta', component: EstadoCuentaComponent, canActivate: [AuthGuardService] }, // Ruta protegida
    { path: 'solicitarTarjeta', component: SolicitarTarjetaComponent, canActivate: [AuthGuardService] }, // Ruta protegida
    { path: 'solicitarCuenta', component: SolicitarCuentaComponent, canActivate: [AuthGuardService] }, // Ruta protegida
    { path: 'transferencias', component: TransferenciasComponent, canActivate: [AuthGuardService] }, // Ruta protegida
    { path: 'login-back-office', component: LoginBackOfficeComponent },
    { path: 'caja', component: CajaComponent, canActivate: [AuthGuardBackOfficeService] }, // Ruta protegida
    { path: 'movimientosTransacciones', component: MovimientosTransaccionesComponent, canActivate: [AuthGuardService] }, // Ruta protegida
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a login por defecto
    { path: '**', redirectTo: '/login'}
];