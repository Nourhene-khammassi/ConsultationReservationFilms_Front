import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FilmComponent } from './components/film/film.component';
import { HomeComponent } from './components/home/home.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { DashboardadminComponent } from './components/dashboardadmin/dashboardadmin.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectionComponent } from './components/projection/projection.component';
import { SalleComponent } from './components/salle/salle.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReserComponent } from './components/reser/reser.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    FilmComponent,
    AuthentificationComponent,
    DashboardadminComponent,
    RegisterComponent,
    ProjectionComponent,
    SalleComponent,
    ReservationComponent,
    ReserComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
