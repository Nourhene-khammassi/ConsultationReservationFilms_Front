import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SalleService } from '../services/salle.service';
import { Salle } from '../models/salle';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FilmDTO } from '../models/FilmDTO';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent implements OnInit {
  filmList: FilmDTO[] = [];
  salleList: Salle[] = [];
  p: number = 1;
  salleFormGroup!: FormGroup;
  salleFormGroup2!: FormGroup;

  submitted: boolean = false;
  salleModel: Salle = new Salle();

  salle: Salle = new Salle(); // used for view 

  file!: File;

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;


  constructor(private salleService: SalleService) { }

  ngOnInit(): void {
    this.loadSalle()
    // on utilissent filmFormGroup ajout film 
    this.salleFormGroup = new FormGroup({

      //initialisation des attributs
      'nbrPlaces': new FormControl('', Validators.required),
      'nomSalle': new FormControl('', Validators.required),


    });
    // on utilissent filmFormGroup2 : pour update et details 
    this.salleFormGroup2 = new FormGroup({

      //required: non vide:champ obligatoire
      'nbrPlaces': new FormControl('', Validators.required),
      'nomSalle': new FormControl('', Validators.required),


    });
  }
  loadSalle(): void {
    this.salleService.findAll().subscribe(salles => {
      this.salleList = salles;
    });
  }

  addSalle() {
    this.submitted = true;
    if (this.salleFormGroup.invalid) {
      console.log(this.salleModel)

      return;
    }
    this.salleModel.nbrPlaces = this.salleFormGroup.value.nbrPlaces;
    this.salleModel.nomSalle = this.salleFormGroup.value.nomSalle;

    console.log(this.salleModel)

    this.salleService.addSalle(this.salleModel)
      .subscribe({
        next: (res) => {
          console.log(res.idSalle)

          this.closeModalBtn.nativeElement.click()
          this.loadSalle();
          this.submitted = false;
          this.salleModel = new Salle();
          this.salleFormGroup.reset();
          //  this.toastrService.success('Success!', 'Votre professeur a été ajouté!');
          //alert("ok")



        },
      });

  }
  deleteSalle(idSalle: number) {
    if (idSalle != undefined && idSalle != null) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer ce salle!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le!',
        cancelButtonText: 'Non, gardez-le'
      }).then((result: any) => {
        if (result.value) {
          // alert(id);
          this.salleService.deleteById(idSalle)
            .subscribe(res => {
              this.loadSalle();
            })
          Swal.fire(
            'Supprimé!',
            'Votre salle a été supprimé.',
            'success'
          )

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'Votre salle est en sécurité 🙂',
            'error'
          )
        }
      })
    }
  }

  viewSalle(idSalle: number) {
    if (idSalle != undefined && idSalle != null) {
      this.salle = new Salle();
      this.salleService.findById(idSalle).subscribe(res => {
        this.salle = res;
        console.log('view ', this.salle)
      })
    }
  }


  // methode pour voir les détails de film avec btn modification si on peut modifier une chose dans details de film
  getSalle(salleId: number) {

    if (salleId != undefined && salleId != null) {
      this.salleService.getSalleById(salleId).subscribe(
        res => {
          console.log(res);
          this.salleModel = res
        }, error => {
          console.error(error)
        }, () => {


          this.salleFormGroup2.get("nbrPlaces")?.setValue(this.salleModel.nbrPlaces);
          this.salleFormGroup2.get("nomSalle")?.setValue(this.salleModel.nomSalle);

          this.salleFormGroup2.updateValueAndValidity()
        });
    }
  }

  updateSalle() {
    this.submitted = true;

    if (this.salleFormGroup2.invalid) {
      return;
    }

    this.salleModel.nbrPlaces = this.salleFormGroup2.value.nbrPlaces;
    this.salleModel.nomSalle = this.salleFormGroup2.value.nomSalle;

    console.log(this.salleModel)
    this.salleService.addSalle(this.salleModel)
      .subscribe({
        next: (res) => {

          this.submitted = false;
          this.salleModel = new Salle();
          this.salleFormGroup2.reset();
          //this.getFilmList();
          // alert("update meth")


          this.closeUpdateModalBtn.nativeElement.click();
          // this.getFilmList();
          //alertifyjs.set("notifier","position","top-right");
          //alertifyjs.success('Votre professeur a été modifié!');
          // this.toastrService.success('Success!', 'Votre professeur a été modifié!');
          console.log("ok");

        },
      });
    this.loadSalle()


  }
}








