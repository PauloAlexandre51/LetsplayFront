// src/app/editar-quadra/editar-quadra.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuadraService } from '../service/quadra.service';
import { Quadra } from '../interfaces/quadra';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-editar-quadra',
  templateUrl: './editar-quadra.component.html',
  styleUrls: ['./editar-quadra.component.css'],
  imports: [FormsModule, RouterModule]
})
export class EditarQuadraComponent implements OnInit {
  quadra: Quadra = {
    id: 0,
    nome: '',
    telefone: '',
    valorHora: 0,
    endereco: '',
    bairro: '',
    cidade: ''
  };
  id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private quadraService: QuadraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      const foundQuadra = this.quadraService.getQuadraById(this.id);
      if (foundQuadra) {
        this.quadra = foundQuadra;
      }
    });
  }

  salvar(): void {
    if (this.quadra) {
      this.quadraService.updateQuadra(this.quadra);
      alert('Quadra atualizada com sucesso!');
      this.router.navigate(['/home']);
    }
  }

  excluir(): void {
    if (this.id !== null) {
      this.quadraService.deleteQuadra(this.id);
      alert('Quadra excluída com sucesso!');
      this.router.navigate(['/home']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/home']);
  }
}
