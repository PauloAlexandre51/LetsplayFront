export interface Quadra extends QuadraForm {
    id: string;
  }

export interface QuadraForm {
    nome: string;
    telefone: string;
    valorHora: number;
    endereco: string;
    bairro: string;
    cidade: string;
}
