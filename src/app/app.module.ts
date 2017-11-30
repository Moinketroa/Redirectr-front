import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Material Design Imports
import { MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';
import { CardComponent, ListComponent } from './preview/preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
