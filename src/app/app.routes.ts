import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'dashboard',
	},
	{
		path: 'dashboard',
		loadComponent: () => import('./dashboard/dashboard').then(({ Dashboard }) => Dashboard),
	},
	{
		path: 'login',
		loadComponent: () => import('./login/login').then(({ Login }) => Login),
	},
	{
		path: '**',
		redirectTo: 'dashboard',
	},
];
