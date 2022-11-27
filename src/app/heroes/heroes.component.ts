import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {
  hero: Hero = { id: 1, name: 'Windstorm' }
  heroes: Hero[] = []
  selectedHero?: Hero

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes()
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes
    )
  }

  onSelect(hero: Hero): void {
    console.log('hero', hero);
    this.selectedHero = hero;
  }
}
