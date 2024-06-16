import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoService } from '../service/agendamento.service';
import { Agendamento } from '../interfaces/agendamento';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a [routerLink]="['/home']" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <span class="fs-4">Letsplay</span>
          </a>

          <ul class="nav nav-pills">
            <!-- <li class="nav-item"><a href="#" class="nav-link" aria-current="page">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Features</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Pricing</a></li>
            <li class="nav-item"><a href="#" class="nav-link">FAQs</a></li> -->
            <li class="nav-item"><a [routerLink]="['/cadastroquadra']" class="nav-link">Adicionar Quadra</a></li>
            <li class="nav-item"><a (click)="logout()" class="nav-link">Sair</a></li>
          </ul>
        </header>
      <h1>Relatório de Agendamentos</h1>
      <table class="table table-striped" *ngIf="agendamentos$ | async as agendamentos">
        <thead>
          <tr>
            <th>Quadra</th>
            <th>Usuário</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let agendamento of agendamentos">
            <td>{{ agendamento.nomeQuadra }}</td>
            <td>{{ agendamento.idUsuario }}</td>
            <td>{{ agendamento.data }}</td>
            <td>{{ agendamento.hora }}</td>
            <td>{{ agendamento.valorHora | currency:'BRL' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  agendamentos$: Observable<Agendamento[]> | undefined;

  constructor(private agendamentoService: AgendamentoService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadAgendamentos();
  }

  loadAgendamentos() {
    this.agendamentos$ = this.agendamentoService.getAllAgendamentos();
  }

  async logout(): Promise<void> {
    try {
      await this.authService.signOut();
      localStorage.removeItem('userEmail');
      this.router.navigate(['/login']);
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  }
}