import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FilmDTO } from '../models/FilmDTO';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private baseUrl = 'http://localhost:8089/api/v1/GestionFilmsByAdmin/auth';

  constructor(private http: HttpClient) { }

  addFilm(filmDTO: FilmDTO): Observable<FilmDTO> {
    return this.http.post<FilmDTO>(`${this.baseUrl}/addFilm`, filmDTO);
  }

  findById(id: number): Observable<FilmDTO> {
    return this.http.get<FilmDTO>(`${this.baseUrl}/findByid/${id}`);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteById/${id}`);
  }

  findAll(): Observable<FilmDTO[]> {
    return this.http.get<FilmDTO[]>(`${this.baseUrl}/findAll`);
  }

  updateFilm(id: number, filmDTO: FilmDTO): Observable<FilmDTO> {
    return this.http.put<FilmDTO>(`${this.baseUrl}/updateFilm/${id}`, filmDTO);
  }


  uploadImageFilm(id: number, image: File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append(`image`, image)
    let url = this.baseUrl + "/uploadImage/" + id;
    const req = new HttpRequest('POST', url, formData, { reportProgress: true, responseType: 'text' })
    return this.http.request(req);
  }

  getFilmById(id: number): Observable<FilmDTO> {
    return this.http.get(`${this.baseUrl}/findById/${id}`).pipe(
      map((response: any) => response as FilmDTO)
    );
  }
  getMaxFilmId(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/maxFilmId`);
  }


  getFilmsAfterToday(): Observable<FilmDTO[]> {
    return this.http.get<FilmDTO[]>(`${this.baseUrl}/aftertoday`);
  }
}
