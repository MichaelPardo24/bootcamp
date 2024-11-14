import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    // Verificar si localStorage está disponible antes de usarlo
    if (this.isLocalStorageAvailable() && this.authService.isLoggedIn()) {
      return true; // Usuario autenticado, permitir el acceso
    } else {
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return false;
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
