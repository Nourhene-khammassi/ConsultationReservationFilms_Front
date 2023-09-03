
import { Component, OnInit } from '@angular/core';

import { AuthentficationService } from '../services/authentfication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthentficationService) { }

  ngOnInit(): void {


  }

}
