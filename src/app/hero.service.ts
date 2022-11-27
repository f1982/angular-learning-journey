import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    // Converts the arguments to an observable sequence.
    const heroes = of(HEROES)
    return heroes
  }
}
