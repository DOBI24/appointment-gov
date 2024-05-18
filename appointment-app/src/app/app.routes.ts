import { Routes } from '@angular/router';
import { authGuard } from './shared/services/auth.guard';

export const routes: Routes = [
    {
        path: 'main',
        loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path:'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'book',
        loadComponent: () => import('./pages/book/book.component').then(m => m.BookComponent),
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
    }
];