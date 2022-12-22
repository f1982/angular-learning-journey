import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-directives',
  templateUrl: './internal-directives.component.html',
  styleUrls: ['./internal-directives.component.sass']
})

export class InternalDirectivesComponent implements OnInit {

  currentClasses: Record<string, boolean> = {};
  currentData: {
    name: string
  } = {
    name: "input name"
  }
  constructor() { }

  ngOnInit(): void {
    this.setCurrentClasses()
  }

  setCurrentClasses() {
    // CSS classes: added/removed per current state of component properties
    // class="saveable special"
    this.currentClasses = {
      saveable: true,
      modified: false,
      special: true
    };
    
  }

  setUppercaseName(value:string) {
    this.currentData.name = value
  }

}
