import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common'
import { CatalogoquadraComponent } from '../catalogoquadra/catalogoquadra.component';
import { QuadraService } from '../service/quadra.service';
import { RouterModule, Router } from '@angular/router';
import { DetalheQuadraComponent } from '../detalhe-quadra/detalhe-quadra.component';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Quadra } from '../interfaces/quadra';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CatalogoquadraComponent, RouterModule, DetalheQuadraComponent, AsyncPipe, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isAdmin: boolean = false;

  private _quadrasService = inject(QuadraService);
  private fb = inject(FormBuilder);

  quadras$ = this._quadrasService.getAllQuadras();
  filteredQuadras: Quadra[] = [];
  cidades: string[] = [];
  bairros: string[] = [];

  filterForm: FormGroup = this.fb.group({
    nome: [''],
    cidade: [''],
    bairro: ['']
  });

  constructor(private authService: AuthService, private router: Router) {
    this.isAdmin = this.authService.isAdminUser(this.authService.getCurrentUserEmail());
    
    this.quadras$.subscribe(quadras => {
      this.filteredQuadras = quadras;
      this.cidades = Array.from(new Set(quadras.map(quadra => quadra.cidade)));
      this.bairros = Array.from(new Set(quadras.map(quadra => quadra.bairro)));
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.applyFilter();
    });
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

  applyFilter() {
    const { nome, cidade, bairro } = this.filterForm.value;
    this.quadras$.subscribe(quadras => {
      this.filteredQuadras = quadras.filter(quadra => 
        (!nome || quadra.nome.toLowerCase().includes(nome.toLowerCase())) &&
        (!cidade || quadra.cidade === cidade) &&
        (!bairro || quadra.bairro === bairro)
      );
    });
  }
}