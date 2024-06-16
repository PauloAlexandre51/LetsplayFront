import { Component, OnInit } from '@angular/core';
import { Agendamento } from '../interfaces/agendamento';
import { AgendamentoService } from '../service/agendamento.service';
import { AuthService } from '../service/auth.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meusagendamentos',
  standalone: true,
  imports: [RouterModule, CommonModule],
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
            <li class="nav-item"><a [routerLink]="['/meusagendamentos']" class="nav-link">Agendamentos</a></li>
            <li class="nav-item"><a (click)="logout()" class="nav-link">Sair</a></li>
          </ul>
        </header>
      </div>

      <div class="container">
  <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
    <a [routerLink]="['/home']" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <span class="fs-4">Meus Agendamentos</span>
    </a>
  </header>

  <main>
    <div *ngIf="agendamentos.length === 0" class="alert alert-info">
      Nenhum agendamento encontrado.
    </div>

    <div *ngFor="let agendamento of agendamentos" class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">{{ agendamento.nomeQuadra }}</h5>
        <p class="card-text">Data: {{ agendamento.data }}, Horário: {{ agendamento.hora }}</p>
        <p class="card-text">Valor: R$ {{ agendamento.valorHora }} por hora</p>
      </div>
    </div>
  </main>
</div>
  `,
  styleUrl: './meusagendamentos.component.css'
})
export class MeusagendamentosComponent {

  agendamentos: Agendamento[] = [];

  constructor(
    private agendamentoService: AgendamentoService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const userEmail = this.authService.getCurrentUserEmail();
      if (userEmail) {
        this.agendamentoService.getAgendamentosByUsuario(userEmail).then(agendamentos => {
          this.agendamentos = agendamentos;
          console.log(agendamentos)
        });
      } else {
        console.error('Usuário não autenticado');
      }
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    }
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
