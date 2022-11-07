import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HighlightDirective } from './directives/highlight.directive';
import { NgModule } from '@angular/core';
// import { TestDirectiveDirective } from './test-directive.directive';
import { XyzComponent } from './xyz/xyz.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroItemComponent } from './hero-item/hero-item.component';

@NgModule({
  declarations: [
    AppComponent,
    XyzComponent,
    // TestDirectiveDirective,
    HighlightDirective,
    HeroListComponent,
    HeroItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
