import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilmComponent } from './components/film/film.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardadminComponent } from './components/dashboardadmin/dashboardadmin.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { ProjectionComponent } from './components/projection/projection.component';
import { SalleComponent } from './components/salle/salle.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReserComponent } from './components/reser/reser.component';

const routes: Routes = [
  { path: "authentification", component: AuthentificationComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboardadmin", component: DashboardadminComponent },
  { path: "film", component: FilmComponent },

  { path: "projection", component: ProjectionComponent },
  { path: "salle", component: SalleComponent },
  { path: "reservationFilm/:idFilm", component: ReservationComponent },

  { path: "reser", component: ReserComponent },



  {
    path: "", component: HomeComponent,
    children: [
      { path: "", component: LayoutComponent },
      { path: "header", component: HeaderComponent },
      { path: "footer", component: FooterComponent },



    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
