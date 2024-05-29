import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quadra } from '../interfaces/quadra'
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogoquadra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogoquadra.component.html',
  styleUrl: './catalogoquadra.component.css'
})
export class CatalogoquadraComponent {
  @Input() quadra!: Quadra;

  constructor(private router: Router) { }

  goToDetails(): void {
    this.router.navigate(['/detalhe', this.quadra.id]);
  }
}
