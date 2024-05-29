import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuadraService } from '../service/quadra.service';   
import { Quadra } from '../interfaces/quadra';
    

@Component({
  selector: 'app-detalhe-quadra',
  standalone: true,
  imports: [],
  template: `
    <p>
      {{ quadra?.nome }}
    </p>
  `,
  styleUrl: './detalhe-quadra.component.css'
})
export class DetalheQuadraComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  quadraService = inject(QuadraService);
  quadra: Quadra | undefined;

    constructor() {
        const quadraId = Number(this.route.snapshot.params['id']);
        this.quadra = this.quadraService.getQuadraById(quadraId);
    }
}
