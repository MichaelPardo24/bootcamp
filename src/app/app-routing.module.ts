import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampanasComponent } from './components/campanas/campanas.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  { path: 'inicio', component: InicioComponent },  // Muestra InicioComponent dentro de /index
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent, canActivate: [AuthGuard] },
  { path: 'campanas', component: CampanasComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'contactenos', component: ContactenosComponent },
  { path: 'sobre_nosotros', component: SobreNosotrosComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },  // Redirige a /index al inicio
  { path: '**', redirectTo: '/inicio' }  // Cualquier ruta inválida redirige a /index
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],  // Configuración de enrutamiento
  exports: [RouterModule]
})
export class AppRoutingModule { }
