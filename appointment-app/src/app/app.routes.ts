import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BookComponent } from './pages/book/book.component';

export const routes: Routes = [
    { path: 'main', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'book', component: BookComponent },
    { path: '',   redirectTo: '/main', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
