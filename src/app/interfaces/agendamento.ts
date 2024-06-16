export interface Agendamento {
    id: string;
    idUsuario: string;
    idQuadra: string;
    nomeQuadra: string;
    data: string | null;
    hora: string;
    valorHora: number;
}