import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightDirective } from './directives/highlight.directive';
// import { TestDirectiveDirective } from './test-directive.directive';
import { ExamplesComponent } from './examples/examples.component';
import { HeroItemComponent } from './hero-list-example/hero-item/hero-item.component';
import { HeroListComponent } from './hero-list-example/hero-list/hero-list.component';
import { HomeComponent } from './home/home.component';
import { MatTableExample } from './mat-table/mat-table.component';
import { XyzComponent } from './xyz/xyz.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PspdfkitBasicComponent } from './pspdfkit-basic/pspdfkit-basic.component';
import { ExternalJsComponent } from './external-js/external-js.component';
import { RouteParametersComponent } from './route-parameters/route-parameters.component';
import { TinymceUploadComponent } from './tinymce-upload/tinymce-upload.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import {
  FormsModule
} from '@angular/forms';
import { NgModelComponent } from './ng-model/ng-model.component';

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
    PageNotFoundComponent,
    PspdfkitBasicComponent,
    ExternalJsComponent,
    RouteParametersComponent,
    TinymceUploadComponent,
    NgModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditorModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
