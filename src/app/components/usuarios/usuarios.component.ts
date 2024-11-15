import { HttpClient } from '@angular/common/http';
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
  usuarioSeleccionado: any = { id: null, nombre: '', email: '' };

  constructor(private apiService: ApiService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.apiService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  crearUsuario() {
    this.apiService.registrarUsuario(this.nuevoUsuario).subscribe(response => {
      alert(response.mensaje);
      this.obtenerUsuarios();
    });
  }

  actualizarUsuario(usuario: any) {
    this.apiService.actualizarUsuario(usuario.id, { nombre: usuario.nombre, email: usuario.email }).subscribe(response => {
      alert(response.mensaje);
      this.obtenerUsuarios();
    });
  }

  eliminarUsuario(id: number) {
    this.apiService.eliminarUsuario(id).subscribe(response => {
      alert(response.mensaje);
      this.obtenerUsuarios();
    });
  }

  seleccionarUsuario(usuario: any) {
    this.usuarioSeleccionado = { ...usuario };
  }
}
