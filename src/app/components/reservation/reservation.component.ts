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
  idProjection!: any;
  projectionList: Array<Projection> = []

  constructor(private route: ActivatedRoute, private filmservice: FilmService, private projectionservice: ProjectionService, private routing: Router) {
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
    this.projectionservice.getProjectionsByFilmId(idFilm).subscribe(projection => {
      this.projectionList = projection;
      console.log(this.projectionList)
    })
  }
  setProjection(event: any){
    const selectedValue = event.target.value;
    this.idProjection=selectedValue
  
    

  }
  goToProjection(){
    if (this.idProjection) {
      this.routing.navigate(['/reser/', this.idProjection])
    }else{
      alert("select projection")
    }
    
  }
}
