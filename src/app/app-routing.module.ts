import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesComponent } from './examples/examples.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HomeComponent } from './home/home.component';
import { MatTableExample } from './mat-table/mat-table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { XyzComponent } from './xyz/xyz.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'examples', component: ExamplesComponent },
  { path: 'examples/hero', component: HeroListComponent },
  { path: 'examples/xyz', component: XyzComponent },
  { path: 'examples/mat-table', component: MatTableExample },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
