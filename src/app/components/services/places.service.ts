import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private apiUrl = 'http://localhost:8089/api/v1/GestionPlacesByAdmin/auth'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  addPlace(placeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addPlaces`, placeData);
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/findByid/${id}`);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteById/${id}`);
  }

  findAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/findAll`);
  }
}
