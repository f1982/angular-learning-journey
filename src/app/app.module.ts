import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightDirective } from './directives/highlight.directive';
// import { TestDirectiveDirective } from './test-directive.directive';
import { ExamplesComponent } from './examples/examples.component';
import { HeroItemComponent } from './hero-item/hero-item.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HomeComponent } from './home/home.component';
import { MatTableExample } from './mat-table/mat-table.component';
import { XyzComponent } from './xyz/xyz.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
    ExamplesComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
