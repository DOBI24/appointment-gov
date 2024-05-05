import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
    { path: 'main', component: MainComponent },
    { path: '',   redirectTo: '/main', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
