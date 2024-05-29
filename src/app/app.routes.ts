import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CadastrousuarioComponent } from './cadastrousuario/cadastrousuario.component';
import { DetalheQuadraComponent } from './detalhe-quadra/detalhe-quadra.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'cadastrousuario', component: CadastrousuarioComponent },
    { path: 'detalhe/:id', component: DetalheQuadraComponent, title: 'Detalhe' }
];
