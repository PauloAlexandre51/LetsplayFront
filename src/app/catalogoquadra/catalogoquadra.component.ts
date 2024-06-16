import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quadra } from '../interfaces/quadra'
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-catalogoquadra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogoquadra.component.html',
  styleUrl: './catalogoquadra.component.css'
})
export class CatalogoquadraComponent implements OnInit {
  @Input() quadra!: Quadra;
  isAdmin: boolean = false;

  async ngOnInit(): Promise<void> {
    this.isAdmin = this.authService.isAdminUser(this.authService.getCurrentUserEmail());
  }

  constructor(private router: Router, private authService: AuthService) { 
    
  }

  goToDetails(quadra: Quadra){
    console.log(quadra)
    this.router.navigate(['/detalhe', this.quadra.id]);
  }

  goToEdit(quadra: Quadra): void {
    // Implementar navegação para editar a quadra
    this.router.navigate(['/editarquadra', this.quadra.id]);
  }
}
