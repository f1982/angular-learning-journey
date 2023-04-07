import { Component, OnInit } from '@angular/core';
import { get } from 'scriptjs';

@Component({
  selector: 'app-external-js',
  templateUrl: './external-js.component.html',
  styleUrls: ['./external-js.component.sass'],
})
export class ExternalJsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    get('https://maps.googleapis.com/maps/api/js?key=', () => {
      //Google Maps library has been loaded...
      console.log('external js loaded...')
    });
  }
}
