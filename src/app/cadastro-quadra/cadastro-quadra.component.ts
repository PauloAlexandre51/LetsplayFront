import { Component } from '@angular/core';
import { QuadraService } from '../service/quadra.service';   
import { Quadra } from '../interfaces/quadra';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-quadra',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './cadastro-quadra.component.html',
  styleUrl: './cadastro-quadra.component.css'
})
export class CadastroQuadraComponent {
    quadra: Quadra = {
    id: 0,
    nome: '',
    telefone: '',
    valorHora: 0,
    endereco: '',
    bairro: '',
    cidade: ''
  };
  constructor(private quadraService: QuadraService, private router: Router) { }

  cadastrar(): void {
    this.quadraService.addQuadra(this.quadra);
    alert('Quadra cadastrada com sucesso!');
    this.router.navigate(['/home']);
  }

  cancelar(): void {
    this.router.navigate(['/home']);
  }

}
