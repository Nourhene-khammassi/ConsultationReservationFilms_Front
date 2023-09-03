import { Component, OnInit } from '@angular/core';
import { SalleService } from '../services/salle.service';
import { Salle } from '../models/salle';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from '../services/places.service';
import { Places } from '../models/places';
import { ReservationService } from '../services/reservation.service';
import { ProjectionService } from '../services/projection.service';
import { ActivatedRoute } from '@angular/router';
import { Projection } from '../models/projection';
import { formatDate } from '@angular/common';
import { ReservationDTO } from '../models/ReservationDTO';

@Component({
  selector: 'app-reser',
  templateUrl: './reser.component.html',
  styleUrls: ['./reser.component.css']
})

export class ReserComponent implements OnInit {
  salle!: Salle[]
  places!: Places[]
  selectedPlace!: Places[]
  TabPlace: any[] = [];
  lengthPlace:any;
  idprojection:any;
  projection:any;
   reservation = new ReservationDTO();
  constructor(private route: ActivatedRoute, private projectionService:ProjectionService , private serviceplace: PlacesService, private serviceReservation: ReservationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.idprojection = data['idProjection']
      
    this.projectionService.findById(this.idprojection).subscribe(datap=>{
      this.projection=datap;
      console.log(this.projection)
    })
    });
    this.serviceplace.findAll().subscribe({
      next: data => {
        this.places = data;
        console.log(this.places)
      }
    })
 
  }
 


  
  addReservation() {
    const currentDate = new Date();
  const formattedDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
  this.reservation.dateReservation=formattedDate
  this.reservation.nbPlaces=this.lengthPlace
  this.reservation.projection=this.projection
  this.reservation.places=this.TabPlace
    
    console.log(this.selectedPlace)

    console.log("test", this.reservation)

    this.serviceReservation.addReservation(this.reservation)
      .subscribe({
        next: (res) => {
          alert("ok")
        }
      });

  }




  addToTable(place: any) {
    const placeIndex = this.TabPlace.indexOf(place);

    if (placeIndex === -1) {
      // Place not in the array, add it
      this.TabPlace.push(place);
    } else {
      // Place is in the array, remove it
      this.TabPlace.splice(placeIndex, 1);
    }
    this.lengthPlace=this.TabPlace.length;
    console.log(this.TabPlace)
  }
  
}
