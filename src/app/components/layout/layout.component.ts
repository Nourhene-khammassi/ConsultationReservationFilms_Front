import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { FilmDTO } from '../models/FilmDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  filmList: FilmDTO[] = [];
  listFilmNew: FilmDTO[] = [];
  filmnew!: any;
  constructor(private filmService: FilmService, private routing: Router) { }

  ngOnInit(): void {
    this.loadFilms()
    this.getMaxFilmId()
    this.loadFilmsAfterToday()
  }
  loadFilms(): void {
    this.filmService.findAll().subscribe(films => {
      this.filmList = films;
    });
  }


  getMaxFilmId() {
    this.filmService.getMaxFilmId().subscribe(film => {
      this.filmnew = film;

    });

  }
  goToresvation(idFilm: any) {
    this.routing.navigate(['/reservationFilm', idFilm])

  }
  // listfilmnew pour les films after to day 
  loadFilmsAfterToday() {
    this.filmService.getFilmsAfterToday().subscribe(films => {
      this.listFilmNew = films;
      console.log(this.listFilmNew);
    });
  }
}
