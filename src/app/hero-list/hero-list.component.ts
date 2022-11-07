import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Hero, HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.sass'],
  providers: [HeroService],
})
export class HeroListComponent implements OnInit, AfterViewInit {
  @ViewChild('title') domTitle?:ElementRef;
  
  heroes: Hero[] = [];
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    console.log(hero);
  }

  constructor(private service: HeroService) {}

  ngOnInit(): void {
    this.heroes = this.service.getHeroes();

    
  }
  
  ngAfterViewInit():void {
    console.log('ngAfterViewInit', this.domTitle?.nativeElement);

  }
}
