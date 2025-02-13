/// <reference path="src/definitions/alimento.d.ts" />
/// <reference path="src/definitions/ingrediente.d.ts" />

interface CardapioItem {
    id: string;
    nome: string;
    tipo: string;
    calorias: number;
    proteinas: number;
    peso: number;
    itens: any[];
    created: Date;
}