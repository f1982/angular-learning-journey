import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-model-comp',
  templateUrl: './ng-model.component.html',
  styleUrls: ['./ng-model.component.sass']
})
export class NgModelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('ngOnInit')
  }

  name: string = '';

  setValue() {
    this.name = 'Nancy';
  }

}
