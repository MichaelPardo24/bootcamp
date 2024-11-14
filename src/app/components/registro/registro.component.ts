import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario = { nombre: '', email: '', password: '' };

  constructor(private apiService: ApiService) { }

  registrar() {
    this.apiService.registrarUsuario(this.usuario).subscribe(response => {
      console.log(response);
      alert(response.mensaje);
    });
  }
}
