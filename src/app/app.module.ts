import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Si usas ngModel, también necesitas FormsModule
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampanasComponent } from './components/campanas/campanas.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CampanasComponent,
    UsuariosComponent,
    NavbarComponent,
    FooterComponent,
    SobreNosotrosComponent,
    ContactenosComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  // Asegúrate de agregar HttpClientModule aquí
    FormsModule        // Asegúrate de agregar FormsModule si usas ngModel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
