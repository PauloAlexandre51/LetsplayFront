import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormsModule
} from '@angular/forms';
import { QuadraService } from '../service/quadra.service';   
import { QuadraForm } from '../interfaces/quadra';
import { RouterLink, Router } from '@angular/router';

export interface CreateForm {
  nome: FormControl<string>;
  telefone: FormControl<string>;
  valorHora: FormControl<number>;
  endereco: FormControl<string>;
  bairro: FormControl<string>;
  cidade: FormControl<string>;
  //description?: FormControl<string | undefined>;
}

@Component({
  selector: 'app-cadastro-quadra',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './cadastro-quadra.component.html',
  styleUrl: './cadastro-quadra.component.css'
})
export class CadastroQuadraComponent {
   
  private _formBuilder = inject(FormBuilder).nonNullable;

  private _router = inject(Router);

  private _quadrasService = inject(QuadraService);

  form = this._formBuilder.group<CreateForm>({
    nome: this._formBuilder.control('', Validators.required),
    telefone: this._formBuilder.control('', Validators.required),
    valorHora: this._formBuilder.control(0, Validators.required),
    endereco: this._formBuilder.control('', Validators.required),
    bairro: this._formBuilder.control('', Validators.required),
    cidade: this._formBuilder.control('', Validators.required),
  });

  async cadastrarQuadra() {
    if (this.form.invalid) {
      alert('preencha todos os campos')
      return;
    } 
    try {
      const quadra = this.form.value as QuadraForm;
      await this._quadrasService.addQuadra(quadra);
      this._router.navigate(['/home']);
      alert('Quadra cadastrada com sucesso!');
      this._router.navigate(['/home']);
    } catch (error) {
      // call some toast service to handle the error
    }
    
  }

  cancelar(): void {
    this._router.navigate(['/home']);
  }

}
