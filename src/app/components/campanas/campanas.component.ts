import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-campanas',
  templateUrl: './campanas.component.html',
  styleUrls: ['./campanas.component.css']
})
export class CampanasComponent implements OnInit {
  campanas: any[] = [];
  nuevaCampana = { titulo: '', descripcion: '', destino: '' };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Obtener las campañas existentes
    this.apiService.getCampanas().subscribe(data => {
      this.campanas = data;
    });
  }

  // Función para crear una nueva campaña
  crearCampana() {
    this.apiService.crearCampana(this.nuevaCampana).subscribe(response => {
      // Verificar que la respuesta esté llegando correctamente
      console.log('Respuesta:', response);

      if (response && response.mensaje) {
        alert(response.mensaje);  // Mostrar el mensaje de respuesta
      } else {
        alert('Error al crear la campaña');
      }

      // Volver a obtener la lista de campañas después de agregar una nueva
      this.apiService.getCampanas().subscribe(data => {
        this.campanas = data;
      });
    }, error => {
      console.error('Error al crear campaña:', error);
      alert('Hubo un error al crear la campaña');
    });
  }
}
