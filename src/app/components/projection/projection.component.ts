import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProjectionService } from '../services/projection.service';
import { Projection } from '../models/projection';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FilmDTO } from '../models/FilmDTO';
import { FilmService } from '../services/film.service';
import { SalleService } from '../services/salle.service';
import { Salle } from '../models/salle';

@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.css']
})
export class ProjectionComponent implements OnInit {
  projectionList: Projection[] = [];
  filmList: FilmDTO[] = [];
  salleList: Salle[] = [];

  p: number = 1;
  projectionFormGroup!: FormGroup;
  projectionFormGroup2!: FormGroup;

  submitted: boolean = false;
  editData: boolean = false;
  showData: boolean = false;
  editDataFilms: boolean = false;
  showDataFilm: boolean = false;


  projectionModel: Projection = new Projection();
  projectionModel2: Projection = new Projection();

  projection: Projection = new Projection(); // used for view 

  file!: File;
  imgUrl: string | ArrayBuffer = 'assets/images/PosterNotAvailable.jpg'

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;


  constructor(private projectionservice: ProjectionService, private filmservice: FilmService, private salleservice: SalleService) { }

  ngOnInit(): void {
    this.loadProjections()
    this.loadFilms()
    this.loadSalle()
    // on utilissent filmFormGroup ajout film 
    this.projectionFormGroup = new FormGroup({

      //initialisation des attributs

      'dateProjection': new FormControl('', Validators.required),
      'tarifProjection': new FormControl('', Validators.required),
      'timeProjection': new FormControl('', Validators.required),
      'salledto': new FormControl('', Validators.required),
      'filmdto': new FormControl('', Validators.required),

    });
    // on utilissent filmFormGroup2 : pour update et details 
    this.projectionFormGroup2 = new FormGroup({

      //required: non vide:champ obligatoire

      'idProjection': new FormControl('', Validators.required),

      'dateProjection': new FormControl('', Validators.required),
      'tarifProjection': new FormControl('', Validators.required),
      'timeProjection': new FormControl('', Validators.required),
      'salledto': new FormControl('', Validators.required),
      'filmdto': new FormControl('', Validators.required),
      'salledto.nomSalle': new FormControl('', Validators.required),
      'filmdto.nomFilm': new FormControl('', Validators.required),
    });
  }
  loadProjections(): void {
    this.projectionservice.findAll().subscribe(projections => {
      this.projectionList = projections;
    });
  }
  loadFilms(): void {
    this.filmservice.findAll().subscribe(films => {
      this.filmList = films;
    });
  }
  loadSalle(): void {
    this.salleservice.findAll().subscribe(salles => {
      this.salleList = salles;
    });
  }

  addProjection() {
    this.submitted = true;
    if (this.projectionFormGroup.invalid) {
      return;
    }

    this.projectionModel.dateProjection = this.projectionFormGroup.value.dateProjection;
    this.projectionModel.tarifProjection = this.projectionFormGroup.value.tarifProjection;
    this.projectionModel.timeProjection = this.projectionFormGroup.value.timeProjection;
    this.projectionModel.filmdto = this.projectionFormGroup.value.filmdto;
    this.projectionModel.salledto = this.projectionFormGroup.value.salledto;

    console.log(this.projectionModel)

    this.projectionservice.addProjection(this.projectionModel)
      .subscribe({
        next: (res) => {
          console.log(res.idProjection)

          this.closeModalBtn.nativeElement.click()
          this.loadProjections();
          this.submitted = false;
          this.projectionModel = new Projection();
          this.projectionFormGroup.reset();
          //  this.toastrService.success('Success!', 'Votre professeur a été ajouté!');
          //alert("ok")



        },
      });

  }
  deleteProjection(idProjection: number) {
    if (idProjection != undefined && idProjection != null) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer projection!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le!',
        cancelButtonText: 'Non, gardez-le'
      }).then((result: any) => {
        if (result.value) {
          // alert(id);
          this.projectionservice.deleteById(idProjection)
            .subscribe(res => {
              this.loadProjections();
            })
          Swal.fire(
            'Supprimé!',
            'Votre projection a été supprimé.',
            'success'
          )

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'Votre projection est en sécurité 🙂',
            'error'
          )
        }
      })
    }
  }

  viewProjection(idProjection: number) {
    if (idProjection != undefined && idProjection != null) {
      this.projection = new Projection();
      this.projectionservice.findById(idProjection).subscribe(res => {
        this.projection = res;
        console.log('view ', this.projection)
      })
    }
  }


  // methode pour voir les détails de film avec btn modification si on peut modifier une chose dans details de film
  /* getProjection(projectionId: number) {
 
     if (projectionId != undefined && projectionId != null) {
       this.projectionservice.getProjectionById(projectionId).subscribe(
         res => {
           console.log(res);
           this.projectionModel = res
         }, error => {
           console.error(error)
         }, () => {
 
           this.projectionFormGroup2.get("dateProjection")?.setValue(this.projectionModel.dateProjection);
           this.projectionFormGroup2.get("tarifProjection")?.setValue(this.projectionModel.tarifProjection);
           this.projectionFormGroup2.get("timeProjection")?.setValue(this.projectionModel.timeProjection);
           this.projectionFormGroup2.get("salledto.nomSalle")?.setValue(this.projectionModel.salledto.nomSalle);
           this.projectionFormGroup2.get("filmdto.nomFilm")?.setValue(this.projectionModel.filmdto.nomFilm);
           this.projectionFormGroup2.updateValueAndValidity()
         });
       console.log("nour", this.projectionFormGroup2)
     }
   }*/


  getProjection(projectionId: number) {
    this.showData = true
    this.editData = false
    this.showDataFilm = true
    this.editDataFilms = false

    if (projectionId != undefined && projectionId != null) {
      this.projectionservice.findById(projectionId).subscribe(
        res => {
          console.log(res);
          this.projectionModel = res;
          // Mettez à jour les valeurs du formulaire ici si nécessaire
          this.projectionFormGroup2.patchValue({
            dateProjection: this.projectionModel.dateProjection,
            tarifProjection: this.projectionModel.tarifProjection,
            timeProjection: this.projectionModel.timeProjection,
            'salledto.nomSalle': this.projectionModel.salledto.nomSalle,
            'filmdto.nomFilm': this.projectionModel.filmdto.nomFilm,
          });
        },
        error => {
          console.error(error);
        }
      );
    }
  }




  updateProjection() {
    this.submitted = true;
    // this.editData = true
    // this.showData = false


    //if (this.projectionFormGroup2.invalid) {
    // return;
    //}
    this.projectionModel.idProjection = this.projectionFormGroup2.value.idProjection;
    this.projectionModel.dateProjection = this.projectionFormGroup2.value.dateProjection;
    this.projectionModel.tarifProjection = this.projectionFormGroup2.value.tarifProjection;
    this.projectionModel.timeProjection = this.projectionFormGroup2.value.timeProjection;
    this.projectionModel.filmdto = this.projectionFormGroup2.value.filmdto;
    this.projectionModel.salledto = this.projectionFormGroup2.value.salledto;
    this.projectionModel.filmdto.nomFilm = this.projectionFormGroup2.value.filmdto.nomFilm;
    this.projectionModel.salledto.nomSalle = this.projectionFormGroup2.value.salledto.nomSalle;
    console.log("nour", this.projectionModel)
    this.projectionservice.addProjection(this.projectionModel)
      .subscribe({
        next: (res) => {

          this.submitted = false;
          this.projectionModel = new Projection();
          this.projectionFormGroup2.reset();
          //this.getFilmList();
          this.loadProjections()

          this.closeUpdateModalBtn.nativeElement.click();
          // this.getFilmList();
          //alertifyjs.set("notifier","position","top-right");
          //alertifyjs.success('Votre professeur a été modifié!');
          // this.toastrService.success('Success!', 'Votre professeur a été modifié!');
          console.log(this.projectionModel);

        },
      });



  }

  editDataa() {
    this.loadSalle();
    this.editData = true
    this.showData = false
  }

  editDataFilm() {
    this.loadFilms();
    this.editDataFilms = true
    this.showDataFilm = false
  }
}

