import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthService) { }  // Inyecta AuthService

  // Llama al método logout del servicio de autenticación
  logout() {
    this.authService.logout();
  }
}
