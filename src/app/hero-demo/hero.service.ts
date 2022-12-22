import { Injectable } from '@angular/core';
import { Hero } from './hero-types';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // Converts the arguments to an observable sequence.
    const heroes = of(HEROES)
    this.messageService.add('HeroService: fetched heroes')
    return heroes
  }

  getHero(id: number) {
    const hero = HEROES.find(hero => hero.id === id)
    this.messageService.add(`get Hero by Id: ${id}`)
    return of(hero)
  }
}
