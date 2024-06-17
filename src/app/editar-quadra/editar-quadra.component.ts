// src/app/editar-quadra/editar-quadra.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { QuadraService } from '../service/quadra.service';
import { QuadraForm } from '../interfaces/quadra';
import { RouterModule } from '@angular/router';
import { CreateForm } from '../cadastro-quadra/cadastro-quadra.component';
import { AuthService } from '../service/auth.service';

@Component({
  standalone: true,
  selector: 'app-editar-quadra',
  templateUrl: './editar-quadra.component.html',
  styleUrls: ['./editar-quadra.component.css'],
  imports: [FormsModule, RouterModule, ReactiveFormsModule]
})
export class EditarQuadraComponent implements OnInit {
  
  quadraUpdate: QuadraForm = {
    nome: '',
    telefone: '',
    valorHora: 0,
    endereco: '',
    bairro: '',
    cidade: ''
  };

  private _formBuilder = inject(FormBuilder).nonNullable;

  //private _router = inject(Router);

  private _quadrasService = inject(QuadraService);

  private _quadraId = '';

  get quadraId(): string {
    return this._quadraId;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this._quadraId = params.get('id')!;
      this.setFormValues(this._quadraId);
    });
  }

  async salvar() {
    try {
      this.quadraUpdate = this.form.value as QuadraForm;
      await this._quadrasService.updateQuadra(this._quadraId, this.quadraUpdate);
      alert('quadra editada com sucesso')
      this.router.navigate(['/home']);
    } catch (error) {
      alert('ocorreu um erro ao editar a quadra')
      this.router.navigate(['/home']);
    }
  }

  form = this._formBuilder.group<CreateForm>({
    nome: this._formBuilder.control('', Validators.required),
    telefone: this._formBuilder.control('', Validators.required),
    valorHora: this._formBuilder.control(0, Validators.required),
    endereco: this._formBuilder.control('', Validators.required),
    bairro: this._formBuilder.control('', Validators.required),
    cidade: this._formBuilder.control('', Validators.required),
  });

  async setFormValues(id: string) {
    try {
      const quadra = await this._quadrasService.getQuadraById(id);
      if (!quadra) return;
      this.form.setValue({
        nome: quadra.nome,
        telefone: quadra.telefone,
        valorHora: quadra.valorHora,
        endereco: quadra.endereco,
        bairro: quadra.bairro,
        cidade: quadra.cidade
      });
    } catch (error) {}
  }

  async excluir() {
    try {
      await this._quadrasService.deleteQuadra(this._quadraId);
      alert('quadra excluída com sucesso')
      this.router.navigate(['/home']);
    } catch (error) {}
  }

  cancelar(): void {
    this.router.navigate(['/home']);
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
