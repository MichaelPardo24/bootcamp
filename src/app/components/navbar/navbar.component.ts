import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService: AuthService) { }

  // Llamar al método logout del servicio de autenticación
  logout() {
    this.authService.logout();
  }
}
