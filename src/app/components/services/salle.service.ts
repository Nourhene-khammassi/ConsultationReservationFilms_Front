import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Salle } from '../models/salle';

@Injectable({
  providedIn: 'root'
})
export class SalleService {
  private baseUrl = 'http://localhost:8089/api/v1/GestionSallesByAdmin/auth';

  constructor(private http: HttpClient) { }

  addSalle(salleDto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addSalle`, salleDto);
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findById/${id}`);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteById/${id}`);
  }

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/findAll`);
  }

  updateSalle(id: number, salleDto: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateSalle/${id}`, salleDto);
  }

  getSalleById(id: number): Observable<Salle> {

    return this.http.get(`${this.baseUrl}/findById/${id}`).pipe(
      map((response: any) => response as Salle)
    );
  }
}
