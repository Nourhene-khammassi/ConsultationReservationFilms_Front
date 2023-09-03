import { Component, OnInit } from '@angular/core';
import { SalleService } from '../services/salle.service';
import { Salle } from '../models/salle';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from '../services/places.service';
import { Places } from '../models/places';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reser',
  templateUrl: './reser.component.html',
  styleUrls: ['./reser.component.css']
})

export class ReserComponent implements OnInit {
  salle!: Salle[]
  places!: Places[]
  selectedPlace!: Places[]

  reservationFormGroup!: FormGroup
  reservationFormGroup2!: FormGroup
  constructor(private salleservice: SalleService, private serviceplace: PlacesService, private serviceReservation: ReservationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.salleservice.findAll().subscribe({
      next: data => {
        this.salle = data;
        console.log(this.salle)
      }
    })
    this.serviceplace.findAll().subscribe({
      next: data => {
        this.places = data;
        console.log(this.places)
      }
    })
    this.reservationFormGroup = this.formBuilder.group({
      idReservation: ['', Validators.required],
      nbPlaces: [0, Validators.required], // Initialisez nbPlaces avec une valeur par défaut (0 dans cet exemple).
      dateReservation: ['', Validators.required],
      salle: ['', Validators.required],
      places: ['', Validators.required]
    });
  }
  /* this.reservationFormGroup = this.formBuilder.group({
     idReservation: ['', Validators.required],
     nbPlaces: ['', Validators.required],
     dateReservation: ['', Validators.required],
     salle: ['', Validators.required],
     places: ['', Validators.required]
   });
 }*/
  /*this.reservationFormGroup = new FormGroup({

    //initialisation des attributs
    'idReservation': new FormControl('', Validators.required),
    'nbPlaces': new FormControl('', Validators.required),
    'dateReservation': new FormControl('', Validators.required),
    'salle': new FormControl('', Validators.required),
    'places': new FormControl('', Validators.required),


  });*/
  // on utilissent filmFormGroup2 : pour update et details 


  nombreP: any
  addReservation() {
    const form = {
      idReservation: this.reservationFormGroup.value.idReservation,
      nbPlaces: this.nombreP,
      dateReservation: this.reservationFormGroup.value.dateReservation,
      salle: this.reservationFormGroup.value.salle,
      places: this.TabPlace


    }
    console.log(this.selectedPlace)

    console.log("test", form)

    this.serviceReservation.addReservation(form)
      .subscribe({
        next: (res) => {
          alert("ok")
        }
      });

  }

  TabPlace: any[] = [];

  addToTable(places: any) {
    this.TabPlace.push(places)
    console.log(this.TabPlace)
  }
}
