import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import {HomeComponent} from './home/home.component';
import { RedirectrComponent } from './redirectr/redirectr.component';


const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'redirectr/:id', component: RedirectrComponent }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
