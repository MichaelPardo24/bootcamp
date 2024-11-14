import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  campanas: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Obtener las campañas existentes
    this.apiService.getCampanas().subscribe(data => {
      this.campanas = data;
    });
  }

}
