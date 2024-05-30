import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CadastrousuarioComponent } from './cadastrousuario/cadastrousuario.component';
import { DetalheQuadraComponent } from './detalhe-quadra/detalhe-quadra.component';
import { CadastroQuadraComponent } from './cadastro-quadra/cadastro-quadra.component';
import { EditarQuadraComponent } from './editar-quadra/editar-quadra.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'cadastrousuario', component: CadastrousuarioComponent },
    { path: 'detalhe/:id', component: DetalheQuadraComponent, title: 'Detalhe' },
    { path: 'cadastroquadra', component: CadastroQuadraComponent, title: 'Cadastro Quadra' },
    { path: 'editarquadra/:id', component: EditarQuadraComponent, title: 'Editar Quadra' },
];
