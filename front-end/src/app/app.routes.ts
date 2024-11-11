import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { EstadoCuentaComponent } from './components/estado-cuenta/estado-cuenta.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { SolicitarTarjetaComponent } from './components/solicitar-tarjeta/solicitar-tarjeta.component';
import { TransferenciasComponent } from './components/transferencias/transferencias.component';
import { MovimientosTransaccionesComponent } from './components/movimientos-transacciones/movimientos-transacciones.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registroUsuario', component: RegistroUsuarioComponent },
    { path: 'estadoCuenta', component: EstadoCuentaComponent, canActivate: [AuthGuardService] }, // Ruta protegida
    { path: 'solicitarTarjeta', component: SolicitarTarjetaComponent, canActivate: [AuthGuardService] }, // Ruta protegida
    { path: 'transferencias', component: TransferenciasComponent, canActivate: [AuthGuardService] }, // Ruta protegida
    { path: 'movimientosTransacciones', component: MovimientosTransaccionesComponent, canActivate: [AuthGuardService] }, // Ruta protegida
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a login por defecto
    { path: '**', redirectTo: '/login'}
];