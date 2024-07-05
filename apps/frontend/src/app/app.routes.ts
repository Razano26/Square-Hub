import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuardFn } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuardFn],
  },
];
