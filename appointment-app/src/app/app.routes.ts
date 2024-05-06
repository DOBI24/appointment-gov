import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: 'main', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: '',   redirectTo: '/main', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
