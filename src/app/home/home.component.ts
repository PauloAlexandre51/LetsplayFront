import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common'
import { CatalogoquadraComponent } from '../catalogoquadra/catalogoquadra.component';
import { Quadra } from '../interfaces/quadra';
import { QuadraService } from '../service/quadra.service';
import { RouterModule } from '@angular/router';
import { DetalheQuadraComponent } from '../detalhe-quadra/detalhe-quadra.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CatalogoquadraComponent, RouterModule, DetalheQuadraComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private _quadrasService = inject(QuadraService);

  private _router = inject(RouterModule);

  quadras$ = this._quadrasService.getAllQuadras();

  constructor() {}
}
