import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {
  ngOnInit(): void {


  }
  title = 'tp-Clinica-Online';
  
  preparedRoute(outlet: RouterOutlet)
  {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}

