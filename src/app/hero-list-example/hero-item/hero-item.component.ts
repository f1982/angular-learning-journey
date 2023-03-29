import { Component, OnInit } from '@angular/core';

import { Hero } from '../services/hero.service';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.sass'],
})
export class HeroItemComponent implements OnInit {
  hero: Hero = {id:0, name:''};
  
  constructor() {}

  ngOnInit(): void {}
}
