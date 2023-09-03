import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmDTO } from '../models/FilmDTO';
import { ProjectionService } from '../services/projection.service';
import { Projection } from '../models/projection';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  idFilmReservation!: any;
  film!: FilmDTO;
  projection!: Projection;


  projectionList: Array<Projection> = []
  constructor(private route: ActivatedRoute, private filmservice: FilmService, private projectionservice: ProjectionService) {
    this.route.params.subscribe(data => {
      this.idFilmReservation = data['idFilm']
      this.getFilmById(this.idFilmReservation);
      console.log(this.idFilmReservation)

    }

    )
  }

  ngOnInit(): void {
    this.getProjectionsByFilmId(this.film.idFilm);

  }

  getFilmById(idFilm: number) {
    this.filmservice.getFilmById(idFilm).subscribe(film => {
      this.film = film;
      this.getProjectionsByFilmId(this.film.idFilm);
    })
  }



  getProjectionsByFilmId(idFilm: number) {
    this.projectionservice.getProjectionById(idFilm).subscribe(projection => {
      this.projection = projection;
      console.log(this.projection)
    })
  }
}
