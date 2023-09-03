import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationDTO } from '../models/ReservationDTO';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8089/api/v1/GestionReservationByAdmin/auth';


  constructor(private http: HttpClient) { }

  addReservation(reservationData: ReservationDTO): Observable<ReservationDTO> {
    return this.http.post<ReservationDTO>(`${this.baseUrl}/addReservation`, reservationData);
  }

  findById(id: number): Observable<ReservationDTO> {
    return this.http.get<ReservationDTO>(`${this.baseUrl}/findById/${id}`);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteById/${id}`);
  }

  findAll(): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(`${this.baseUrl}/findAll`);
  }

  updateReservation(id: number, reservationData: ReservationDTO): Observable<ReservationDTO> {
    return this.http.put<ReservationDTO>(`${this.baseUrl}/updateReservation/${id}`, reservationData);
  }
}
