import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoService } from '../service/agendamento.service';
import { Agendamento } from '../interfaces/agendamento';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable, BehaviorSubject, combineLatest, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuadraService } from '../service/quadra.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Quadra } from '../interfaces/quadra';

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
          <li class="nav-item"><a [routerLink]="['/cadastroquadra']" class="nav-link">Adicionar Quadra</a></li>
          <li class="nav-item"><a (click)="logout()" class="nav-link">Sair</a></li>
        </ul>
      </header>
      <h1>Relatório de Agendamentos</h1>
      <div class="mb-3">
        <label for="quadraFilter" class="form-label">Filtrar por Quadra:</label>
        <select id="quadraFilter" class="form-select" (change)="applyFilter()">
          <option value="">Todas as Quadras</option>
          <option *ngFor="let quadra of quadras$ | async" [value]="quadra.nome">{{ quadra.nome }}</option>
        </select>
      </div>
      <table class="table table-striped" *ngIf="(filteredAgendamentos$ | async)?.length as length; else noAgendamentos" id="agendamentosTable">
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
          <tr *ngFor="let agendamento of filteredAgendamentos$ | async">
            <td>{{ agendamento.nomeQuadra }}</td>
            <td>{{ agendamento.idUsuario }}</td>
            <td>{{ agendamento.data }}</td>
            <td>{{ agendamento.hora }}</td>
            <td>{{ agendamento.valorHora | currency:'BRL' }}</td>
          </tr>
        </tbody>
      </table>
      <ng-template #noAgendamentos>
        <p>Nenhum agendamento encontrado.</p>
      </ng-template>
      <div class="d-flex justify-content-end mt-3">
        <button class="btn btn-success" (click)="exportToExcel()">Exportar</button>
      </div>
    </div>
  `,
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit, OnDestroy {
  agendamentos$: Observable<Agendamento[]> = of([]);
  filteredAgendamentos$: Observable<Agendamento[]> = of([]);
  quadras$: Observable<Quadra[]> = of([]);

  private quadraFilterSubject = new BehaviorSubject<string>('');
  private subscriptions: Subscription[] = [];

  constructor(
    private agendamentoService: AgendamentoService,
    private authService: AuthService,
    private router: Router,
    private quadraService: QuadraService
  ) {}

  ngOnInit() {
    this.loadAgendamentos();
    this.loadQuadras();
    this.applyFilter();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadAgendamentos() {
    this.agendamentos$ = this.agendamentoService.getAllAgendamentos();
  }

  loadQuadras() {
    this.quadras$ = this.quadraService.getAllQuadras();
  }

  applyFilter() {
    const quadraFilterValue = (document.getElementById('quadraFilter') as HTMLSelectElement).value;
    this.quadraFilterSubject.next(quadraFilterValue);
    this.filteredAgendamentos$ = combineLatest([this.agendamentos$, this.quadraFilterSubject]).pipe(
      map(([agendamentos, quadraFilter]) =>
        agendamentos.filter(agendamento => !quadraFilter || agendamento.nomeQuadra === quadraFilter)
      )
    );
  }

  exportToExcel() {
    const exportSubscription = this.filteredAgendamentos$.subscribe(agendamentos => {
      const filteredData = agendamentos.map(({ idQuadra, id, ...rest }) => rest);
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Agendamentos');

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

      saveAs(blob, 'Relatorio_Agendamentos.xlsx');
    });

    this.subscriptions.push(exportSubscription);
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