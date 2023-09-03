import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FilmDTO } from '../models/FilmDTO';
import { FilmService } from '../services/film.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  filmList: FilmDTO[] = [];
  p: number = 1;
  filmFormGroup!: FormGroup;
  filmFormGroup2!: FormGroup;

  submitted: boolean = false;
  filmModel: FilmDTO = new FilmDTO();
  filmModel2: FilmDTO = new FilmDTO();

  film: FilmDTO = new FilmDTO(); // used for view 
  imagePath!: 'assets/images/PosterNotAvailable.jpg';
  file!: File;
  imgUrl: string | ArrayBuffer = 'assets/images/PosterNotAvailable.jpg';

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;


  constructor(private filmService: FilmService) {
    this.loadFilms()
  }

  ngOnInit(): void {

    //this.loadFilms()
    // on utilissent filmFormGroup ajout film 
    this.filmFormGroup = new FormGroup({

      //initialisation des attributs
      'nomFilm': new FormControl('', Validators.required),
      'dureeFilm': new FormControl('', Validators.required),
      'createur': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'actif': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required),
      'image': new FormControl('', Validators.required),
      'dateFilm': new FormControl('', Validators.required),

    });
    // on utilissent filmFormGroup2 : pour update et details 
    this.filmFormGroup2 = new FormGroup({

      //required: non vide:champ obligatoire
      'nomFilm': new FormControl('', Validators.required),
      'dureeFilm': new FormControl('', Validators.required),
      'createur': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'actif': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required),
      'image': new FormControl('', Validators.required),
      'dateFilm': new FormControl('', Validators.required),

    });
  }
  loadFilms(): void {
    this.filmService.findAll().subscribe(films => {
      this.filmList = films;
    });
  }

  addFilm() {
    this.submitted = true;
    if (this.filmFormGroup.invalid) {
      console.log(this.filmModel)

      return;
    }
    this.filmModel.nomFilm = this.filmFormGroup.value.nomFilm;
    this.filmModel.dureeFilm = this.filmFormGroup.value.dureeFilm;
    this.filmModel.category = this.filmFormGroup.value.category;
    this.filmModel.actif = this.filmFormGroup.value.actif;
    this.filmModel.description = this.filmFormGroup.value.description;
    this.filmModel.image = this.filmFormGroup.value.image;
    this.filmModel.createur = this.filmFormGroup.value.createur;
    this.filmModel.dateFilm = this.filmFormGroup.value.dateFilm;

    console.log(this.filmModel)

    this.filmService.addFilm(this.filmModel)
      .subscribe({
        next: (res) => {
          console.log(res.idFilm)
          this.filmService.uploadImageFilm(res.idFilm, this.file).subscribe(
            res => { }, error => { }, () => {
              this.closeModalBtn.nativeElement.click()
              this.loadFilms();
              this.submitted = false;
              this.filmModel = new FilmDTO();
              this.filmFormGroup.reset();
              this.imgUrl = this.imagePath;
              //  this.toastrService.success('Success!', 'Votre professeur a été ajouté!');
              //alert("ok")

            });

        },
      });

  }
  deleteFilm(idFilm: number) {
    if (idFilm != undefined && idFilm != null) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer ce film!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le!',
        cancelButtonText: 'Non, gardez-le'
      }).then((result: any) => {
        if (result.value) {
          // alert(id);
          this.filmService.deleteById(idFilm)
            .subscribe(res => {
              this.loadFilms();
            })
          Swal.fire(
            'Supprimé!',
            'Votre film a été supprimé.',
            'success'
          )

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Annulé',
            'Votre film est en sécurité 🙂',
            'error'
          )
        }
      })
    }
  }
  //
  viewFilm(idFilm: number) {
    if (idFilm != undefined && idFilm != null) {
      this.film = new FilmDTO();
      this.filmService.findById(idFilm).subscribe(res => {
        this.film = res;
        console.log('view ', this.film)
      })
    }
  }

  onFileInput(files: FileList | null): void {
    // alert("1" + JSON.stringify(files))
    if (files) {
      //  alert("2" + JSON.stringify(files))
      this.file = files.item(0) as File;
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result;
          }
        };
      }
    }
  }

  changeSource(event: any) {
    event.target.src = "assets/images/PosterNotAvailable.jpg";
  }
  // methode pour voir les détails de film avec btn modification si on peut modifier une chose dans details de film
  getFilm(filmId: number) {

    if (filmId != undefined && filmId != null) {
      this.filmService.getFilmById(filmId).subscribe(
        res => {
          console.log(res);
          this.filmModel = res
        }, error => {
          console.error(error)
        }, () => {
          this.imgUrl = this.filmModel.image;
          this.filmFormGroup2.get("nomFilm")?.setValue(this.filmModel.nomFilm);
          this.filmFormGroup2.get("dureeFilm")?.setValue(this.filmModel.dureeFilm);
          this.filmFormGroup2.get("createur")?.setValue(this.filmModel.createur);
          this.filmFormGroup2.get("description")?.setValue(this.filmModel.description);
          this.filmFormGroup2.get("actif")?.setValue(this.filmModel.actif);
          this.filmFormGroup2.get("category")?.setValue(this.filmModel.category);
          this.filmFormGroup2.get("image")?.setValue(this.filmModel.image);
          this.filmFormGroup2.get("dateFilm")?.setValue(this.filmModel.dateFilm);

          this.filmFormGroup2.updateValueAndValidity()
        });
    }
  }

  updateFilm() {
    this.submitted = true;

    if (this.filmFormGroup2.invalid) {
      return;
    }
    this.filmModel.nomFilm = this.filmFormGroup2.value.nomFilm;
    this.filmModel.dureeFilm = this.filmFormGroup2.value.dureeFilm;
    this.filmModel.category = this.filmFormGroup2.value.category;
    this.filmModel.actif = this.filmFormGroup2.value.actif;
    this.filmModel.description = this.filmFormGroup2.value.description;
    this.filmModel.image = this.filmFormGroup2.value.image;
    this.filmModel.createur = this.filmFormGroup2.value.createur;
    this.filmModel.dateFilm = this.filmFormGroup2.value.dateFilm;

    console.log(this.filmModel)
    this.filmService.addFilm(this.filmModel)
      .subscribe({
        next: (res) => {
          this.filmService.uploadImageFilm(res.idFilm, this.file).subscribe(
            res => { }, error => { }, () => {

              this.submitted = false;
              this.filmModel = new FilmDTO();
              this.filmFormGroup2.reset();

              //this.getFilmList();
            });
          this.loadFilms();
          this.closeUpdateModalBtn.nativeElement.click();
          // this.getFilmList();
          //alertifyjs.set("notifier","position","top-right");
          //alertifyjs.success('Votre professeur a été modifié!');
          // this.toastrService.success('Success!', 'Votre professeur a été modifié!');
          console.log("ok");

        },
      });
  }








}
