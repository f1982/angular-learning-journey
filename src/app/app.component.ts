import { Component } from '@angular/core';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'my-angular-app';

  items = [{ id: 0, path: '/' }, ...routes].filter(
    (route) => route.path !== '' && route.path !== '**'
  );
}
