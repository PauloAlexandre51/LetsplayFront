import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common'
import { CatalogoquadraComponent } from '../catalogoquadra/catalogoquadra.component';
import { QuadraService } from '../service/quadra.service';
import { RouterModule, Router } from '@angular/router';
import { DetalheQuadraComponent } from '../detalhe-quadra/detalhe-quadra.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CatalogoquadraComponent, RouterModule, DetalheQuadraComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isAdmin: boolean = false;

  private _quadrasService = inject(QuadraService);

  private _router = inject(RouterModule);

  quadras$ = this._quadrasService.getAllQuadras();

  constructor(private authService: AuthService, private router: Router) {
    this.isAdmin = this.authService.isAdminUser(this.authService.getCurrentUserEmail());
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
}
