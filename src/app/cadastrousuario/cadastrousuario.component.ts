import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrousuario',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastrousuario.component.html',
  styleUrl: './cadastrousuario.component.css'
})
export class CadastrousuarioComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.confirmarSenhas.bind(this)
    });
  }

  confirmarSenhas(formGroup: FormGroup) {
    const senha = formGroup.get('password')?.value;
    const confirmarSenha = formGroup.get('confirmPassword')?.value;
    if (senha !== confirmarSenha) {
      formGroup.get('confirmPassword')?.setErrors({ senhasDiferentes: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  async onSubmit() {
    if (this.form.valid) {
      const { nome, email, password } = this.form.value;
      try {
        const success = await this.authService.signUp(email, password, nome);
        if (success) {
          alert('Usuário cadastrado com sucesso!');
          this.router.navigate(['/home']);
        } else {
          alert('Erro ao cadastrar usuário. Tente novamente mais tarde.');
        }
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Tente novamente mais tarde.');
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}