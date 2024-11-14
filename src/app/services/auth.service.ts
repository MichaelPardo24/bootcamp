import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // Verifica si localStorage está disponible
  private isBrowser() {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  // Método para cerrar sesión
  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('usuario_id');
      this.router.navigate(['/login']);
    }
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem('usuario_id');
    }
    return false;
  }
}
