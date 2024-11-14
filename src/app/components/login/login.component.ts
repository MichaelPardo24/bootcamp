import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importa el Router
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = { email: '', password: '' };

  constructor(private apiService: ApiService, private router: Router) { }  // Inyecta el Router

  login() {
    this.apiService.loginUsuario(this.usuario).subscribe(response => {
      console.log(response);  // Verifica la respuesta de la API

      if (response.mensaje === "Login exitoso") {
        // Almacenar el usuario_id en localStorage para usarlo en otras vistas
        localStorage.setItem('usuario_id', response.usuario_id);

        // Redirigir a la página de Campanas (o cualquier otra página que necesites)
        this.router.navigate(['/campanas']);  // Aquí debe funcionar
      } else {
        alert(response.mensaje);  // Muestra un mensaje si el login falla
      }
    }, error => {
      console.error("Error al hacer login:", error);
      alert('Hubo un error al intentar hacer login');
    });
  }
}
