import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost/marketing-turistico/api';

  constructor(private http: HttpClient) { }

  registrarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro.php`, data);
  }

  loginUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, data);
  }

  crearCampana(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/campanas.php`, data);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/registro.php`);  // Llamamos al archivo PHP para obtener usuarios (GET)
  }

  getCampanas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/campanas_list.php`);  // Llamamos al nuevo archivo PHP para obtener campañas
  }
}
