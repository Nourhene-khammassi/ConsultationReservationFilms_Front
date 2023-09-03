import { Component, OnInit } from '@angular/core';
import { AuthentficationService } from '../services/authentfication.service';
import { AuthenticationRequest } from '../models/authentication-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})

export class AuthentificationComponent implements OnInit {
  authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
  errorMsg !: String;
  path: string = "../assets/img/boxed-bg.jpg";
  data: any;
  form!: FormGroup;
  token = JSON.parse(localStorage.getItem("accesstoken")!)
  Role: any

  constructor(private authService: AuthentficationService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {



    //console.log("token ", decode)
    // console.log(this.authService.getUserRole())



    localStorage.removeItem("accesstoken")

    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,]],
      },
    );
  }
  // login() {
  //   this.authService.authenticate(this.authenticationRequest).subscribe(
  //     (ress) => {
  //       this.authService.setUserToken(ress)
  //       console.log("testRess", ress)
  //       this.router.navigate(["/"])

  //     }, error => {
  //       this.errorMsg = "login ou mot de pass incorect"
  //     }
  //   )

  // }

  // on peut ajouter autres roles
  login1() {
    //console.log(this.form.value) : this.form.value : IL passe le contenue de login et password 
    console.log(this.form.value)
    this.authService.loggin(this.form.value).subscribe(

      (ress: any) => {
        console.log("testRess", ress)
        localStorage.setItem("accesstoken", JSON.stringify(ress))
        this.Role = jwtDecode(ress.access_token)
        console.log("token ", this.Role)
        if (this.Role.authorities[0].authority == "CLIENT") {
          this.router.navigate(["/"])

        } else if (this.Role.authorities[0].authority == "ADMIN") {
          this.router.navigate(["dashboardadmin"])

        }

        else {
          this.router.navigate(["/"])

        }
        console.log("ridha", this.Role.authorities[0].authority)

      }, error => {
        this.errorMsg = "login ou mot de pass incorect"
      }
    )

  }

}