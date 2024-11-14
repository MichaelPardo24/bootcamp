import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  nuevoUsuario = { nombre: '', email: '', password: '' };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Obtener los usuarios existentes
    this.apiService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  // Función para crear un nuevo usuario
  crearUsuario() {
    this.apiService.registrarUsuario(this.nuevoUsuario).subscribe(response => {
      console.log('Respuesta:', response);

      if (response && response.mensaje) {
        alert(response.mensaje);  // Mostrar el mensaje de respuesta
      } else {
        alert('Error al crear el usuario');
      }

      // Volver a obtener la lista de usuarios después de agregar uno nuevo
      this.apiService.getUsuarios().subscribe(data => {
        this.usuarios = data;
      });
    });
  }
}
