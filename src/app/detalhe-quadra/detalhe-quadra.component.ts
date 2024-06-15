import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { QuadraService } from '../service/quadra.service';
import { Agendamento } from '../interfaces/agendamento';
import { AgendamentoService } from '../service/agendamento.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-detalhe-quadra',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    RouterModule
  ],
  template: `
    <div class="container">
      <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a [routerLink]="['/home']" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <span class="fs-4">Letsplay</span>
        </a>
      </header>
    </div>

    <main class="form-signin w-100 m-auto">
      <form [formGroup]="form" (ngSubmit)="agendar()">
        <h1 class="h3 mb-3 fw-normal">Detalhes da Quadra</h1>

        <div class="row">
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="inputNome" placeholder="Nome" formControlName="nome">
              <label for="inputNome">Nome</label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="inputTelefone" placeholder="Telefone" formControlName="telefone">
              <label for="inputTelefone">Telefone</label>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input type="number" class="form-control" id="inputValorHora" placeholder="Valor Hora" formControlName="valorHora">
              <label for="inputValorHora">Valor Hora</label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="inputEndereco" placeholder="Endereço" formControlName="endereco">
              <label for="inputEndereco">Endereço</label>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="inputBairro" placeholder="Bairro" formControlName="bairro">
              <label for="inputBairro">Bairro</label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="inputCidade" placeholder="Cidade" formControlName="cidade">
              <label for="inputCidade">Cidade</label>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input type="date" class="form-control" id="inputData" placeholder="Data" formControlName="data">
              <label for="inputData">Data</label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input type="time" class="form-control" id="inputHoraInicio" placeholder="Hora Início" formControlName="horaInicio">
              <label for="inputHoraInicio">Hora Início</label>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input type="time" class="form-control" id="inputHoraFim" placeholder="Hora Fim" formControlName="horaFim">
              <label for="inputHoraFim">Hora Fim</label>
            </div>
          </div>
        </div>

        <button class="btn btn-primary w-100 py-2 mb-2" type="submit">Agendar</button>
        <button class="btn btn-secondary w-100 py-2 mb-2" type="button" [routerLink]="['/home']">Cancelar</button>
      </form>
      <p class="mt-5 mb-3 text-body-secondary">&copy; FrontEnd FUMEC</p>
    </main>
  `,
  styleUrls: ['./detalhe-quadra.component.css']
})
export class DetalheQuadraComponent implements OnInit {
  form = this.fb.group({
    nome: [{ value: '', disabled: true }, Validators.required],
    telefone: [{ value: '', disabled: true }, Validators.required],
    valorHora: [{ value: 0, disabled: true }, Validators.required],
    endereco: [{ value: '', disabled: true }, Validators.required],
    bairro: [{ value: '', disabled: true }, Validators.required],
    cidade: [{ value: '', disabled: true }, Validators.required],
    data: ['', Validators.required],
    horaInicio: ['', Validators.required],
    horaFim: ['', Validators.required]
  });

  private quadraId: string = '';
  private userEmail: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private quadraService: QuadraService,
    private router: Router,
    private agendamentoService: AgendamentoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.quadraId = params.get('id')!;
      this.loadQuadraDetails(this.quadraId);
    });

    console.log(this.authService.getCurrentUserEmail())
  }

  loadQuadraDetails(id: string): void {
    this.quadraService.getQuadraById(id).then(quadra => {
      if (quadra) {
        this.form.patchValue({
          nome: quadra.nome,
          telefone: quadra.telefone,
          valorHora: quadra.valorHora,
          endereco: quadra.endereco,
          bairro: quadra.bairro,
          cidade: quadra.cidade
        });
      }
    });
  }

  agendar() {
    if (this.form.valid) {
      this.userEmail = this.authService.getCurrentUserEmail();
      const agendamento: Agendamento = {
        id: this.quadraId + '-' + Date.now().toString(),
        idUsuario: this.userEmail,  // Substitua pelo ID do usuário logado
        idQuadra: this.quadraId
      };

      this.agendamentoService.addAgendamento(agendamento).then(() => {
        console.log(`Agendado para ${this.form.value.data} das ${this.form.value.horaInicio} às ${this.form.value.horaFim}`);
        alert('Horário agendado com sucesso!');
        this.router.navigate(['/home']);
      }).catch(error => {
        console.error('Erro ao agendar:', error);
        alert('Erro ao agendar. Tente novamente mais tarde.');
      });
    } else {
      alert('Por favor, preencha todos os campos para agendar.');
    }
  }
}