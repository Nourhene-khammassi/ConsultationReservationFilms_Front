import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Projection } from '../models/projection';

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {

  private baseUrl = 'http://localhost:8089/api/v1/GestionProjectionByAdmin/auth';
  constructor(private http: HttpClient) { }

  addProjection(projection: Projection): Observable<Projection> {
    return this.http.post<Projection>(`${this.baseUrl}/addProjection`, projection);
  }

  findById(id: number): Observable<Projection> {
    return this.http.get<Projection>(`${this.baseUrl}/findById/${id}`);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteById/${id}`);
  }

  findAll(): Observable<Projection[]> {
    return this.http.get<Projection[]>(`${this.baseUrl}/findAll`);
  }

  updateProjection(id: number, projectionDTO: Projection): Observable<Projection> {
    return this.http.put<Projection>(`${this.baseUrl}/updateProjection/${id}`, projectionDTO);
  }



  getProjectionById(id: number): Observable<Projection> {
    return this.http.get(`${this.baseUrl}/findById/${id}`).pipe(
      map((response: any) => response as Projection)
    );
  }


  getProjectionsByFilmId(idFilm: number): Observable<Projection[]> {
    return this.http.get<Projection[]>(`${this.baseUrl}/byfilm/${idFilm}`);
  }


}
