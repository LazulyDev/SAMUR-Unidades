import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'login',
	},
	{
		path: 'dashboard',
		canMatch: [authGuard],
		canActivate: [authGuard],
		loadComponent: () =>
		import('./dashboard/dashboard').then(({ Dashboard }) => Dashboard),
	},
	{
		path: 'login',
		loadComponent: () =>
		import('./login/login').then(({ Login }) => Login),
	},
	{
		path: '**',
		redirectTo: 'login',
	},
];