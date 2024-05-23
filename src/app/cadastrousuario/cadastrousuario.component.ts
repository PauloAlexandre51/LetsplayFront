import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrousuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastrousuario.component.html',
  styleUrl: './cadastrousuario.component.css'
})
export class CadastrousuarioComponent {
  nome: string = '';
  sobrenome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  constructor(private router: Router) {}

  cadastrar() {
    console.log('Cadastrar clicked');
    // Adicione a lógica de cadastro de usuário aqui
    // Redirecione para a página de login após o cadastro bem-sucedido
    this.router.navigate(['/login']);
  }
}
