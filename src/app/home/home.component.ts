import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'
import { CatalogoquadraComponent } from '../catalogoquadra/catalogoquadra.component';
import { Quadra } from '../interfaces/quadra';
import { QuadraService } from '../service/quadra.service';
import { RouterModule } from '@angular/router';
import { DetalheQuadraComponent } from '../detalhe-quadra/detalhe-quadra.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CatalogoquadraComponent, RouterModule, DetalheQuadraComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  quadraList: Quadra[] = [];
  quadraService: QuadraService = inject(QuadraService);

  constructor() {
    this.quadraList = this.quadraService.getAllQuadras();
  }
}
