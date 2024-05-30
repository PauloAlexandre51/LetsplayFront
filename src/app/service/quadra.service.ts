import { Injectable } from '@angular/core';
import { Quadra } from '../interfaces/quadra';

@Injectable({
  providedIn: 'root'
})
export class QuadraService {

  constructor() { }

  quadraList: Quadra[] = [
    {
    id: 0,
    nome: 'quadra 0',
    telefone: '99999',
    valorHora: 150,
    endereco: 'rua da quadra 0',
    bairro: 'Serra Verdade',
    cidade: 'Belo Horizonte'
  },
  {
    id: 1,
    nome: 'quadra 1',
    telefone: '99999',
    valorHora: 150,
    endereco: 'rua da quadra 0',
    bairro: 'bairro da quadra 0',
    cidade: 'BH'
  },
  {
    id: 2,
    nome: 'quadra 2',
    telefone: '99999',
    valorHora: 150,
    endereco: 'rua da quadra 0',
    bairro: 'bairro da quadra 0',
    cidade: 'cidade quadra 0'
  },
  {
    id: 3,
    nome: 'quadra 3',
    telefone: '99999',
    valorHora: 150,
    endereco: 'rua da quadra 0',
    bairro: 'bairro da quadra 0',
    cidade: 'cidade quadra 0'
  },
  {
    id: 4,
    nome: 'quadra 4',
    telefone: '99999',
    valorHora: 150,
    endereco: 'rua da quadra 0',
    bairro: 'bairro da quadra 0',
    cidade: 'cidade quadra 0'
  },
  {
    id: 5,
    nome: 'quadra 5',
    telefone: '99999',
    valorHora: 150,
    endereco: 'rua da quadra 0',
    bairro: 'bairro da quadra 0',
    cidade: 'cidade quadra 0'
  },
  {
    id: 6,
    nome: 'quadra 6',
    telefone: '99999',
    valorHora: 150,
    endereco: 'rua da quadra 0',
    bairro: 'bairro da quadra 0',
    cidade: 'cidade quadra 0'
  }
];

  getAllQuadras(): Quadra[] {
    return this.quadraList;
  }

  getQuadraById(id: number): Quadra | undefined {
    return this.quadraList.find(Quadra => Quadra.id === id);
  }

  addQuadra(quadra: Quadra): void {
    quadra.id = this.quadraList.length > 0 ? Math.max(...this.quadraList.map(q => q.id)) + 1 : 1;
    this.quadraList.push(quadra);
  }

  updateQuadra(updatedQuadra: Quadra): boolean {
    const index = this.quadraList.findIndex(quadra => quadra.id === updatedQuadra.id);
    if (index !== -1) {
      this.quadraList[index] = updatedQuadra;
      return true;
    }
    return false;
  }

  deleteQuadra(id: number): boolean {
    const index = this.quadraList.findIndex(quadra => quadra.id === id);
    if (index !== -1) {
      this.quadraList.splice(index, 1);
      return true;
    }
    return false;
  }

}
