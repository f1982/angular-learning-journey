import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-route-parameters',
  templateUrl: './route-parameters.component.html',
  styleUrls: ['./route-parameters.component.sass'],
})
export class RouteParametersComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  paramId: string | null = null;
  paramName: string | null = null;

  ngOnInit(): void {
    this.paramId = this.route.snapshot.paramMap.get('id');

    this.paramName = this.route.snapshot.paramMap.get('name');
  }
}
