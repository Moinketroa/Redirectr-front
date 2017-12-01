import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import {HomeComponent} from './home/home.component';
import { RedirectrComponent } from './redirectr/redirectr.component';
import {AboutComponent} from './about/about.component';
import { LinkComponent } from './link/link.component';


const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'redirectr/:id', component: RedirectrComponent },
  { path: 'link/:id', component: LinkComponent},
  { path: 'aboutUs', component: AboutComponent },
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, { useHash: true });
