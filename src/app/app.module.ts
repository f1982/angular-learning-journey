import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HighlightDirective } from './directives/highlight.directive';
import { NgModule } from '@angular/core';
// import { TestDirectiveDirective } from './test-directive.directive';
import { XyzComponent } from './xyz/xyz.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroItemComponent } from './hero-item/hero-item.component';
import { MatTableExample } from './mat-table/mat-table.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExamplesComponent } from './examples/examples.component';

@NgModule({
  declarations: [
    AppComponent,
    XyzComponent,
    XyzComponent,
    MatTableExample,
    // TestDirectiveDirective,
    HighlightDirective,
    HeroListComponent,
    HeroItemComponent,
    HomeComponent,
    ExamplesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule // for route 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
