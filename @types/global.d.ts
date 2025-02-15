/// <reference path="../src/definitions/alimento.d.ts" />
/// <reference path="../src/definitions/ingrediente.d.ts" />
/// <reference path="../src/definitions/dictionary.ts" />

interface CardapioItem {
    id: string;
    idCardapio?: string;
    nome: string;
    tipo: string;
    calorias: number;
    proteinas: number;
    peso: number;
    itens: any[];
    created: Date;
}

interface MetaDiaria {
    altura: number;
    atividadeFisica: number;
    ganharMassa: number;
    genero: string;
    id: string;
    idade: number;
    manterPeso: number;
    objetivo: string;
    perderPeso: number;
    peso: number;
    proteinas: number;
    tmb: number
    when: Date;
}