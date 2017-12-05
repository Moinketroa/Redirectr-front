import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Design Imports
import { MatButtonModule, MatDialogModule, MatIconModule, MatListModule, MatToolbarModule } from '@angular/material';

import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CardComponent, ListComponent } from './shared/preview/preview.component';
import { RedirectrComponent } from './redirectr/redirectr.component';
import { AboutComponent } from './about/about.component';
import { LinkComponent } from './link/link.component';
import { RedirectrService } from './shared/redirectr-service/redirectr.service';
import { AddRedirectrComponent } from './add-redirectr/add-redirectr.component';
import { SearchComponent } from './search/search.component';
import { RedirectrViewComponent } from './shared/preview/redirectr-view/redirectr-view.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpdateComponent } from './update/update.component';
import { ThumbnailService } from './shared/thumbnail-service/thumbnail.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    ListComponent,
    RedirectrComponent,
    AboutComponent,
    LinkComponent,
    AddRedirectrComponent,
    SearchComponent,
    RedirectrViewComponent,
    NotFoundComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTES
  ],
  providers: [RedirectrService, ThumbnailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
