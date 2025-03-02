/// <reference path="definitions/alimento.d.ts" />
/// <reference path="definitions/ingrediente.d.ts" />
/// <reference path="definitions/dictionary.d.ts" />
/// <reference path="definitions/components/meta-diaria.d.ts" />
/// <reference path="definitions/components/ingredientes-selecionados.d.ts" />

interface CardapioItem {
    id: string;
    nome: string;
    tipo: string;
    calorias: number;
    proteinas: number;
    peso: number;
    itens: any[];
    created: string;
}

interface RefeicaoDia {
    dia: string;
    registros: RegistroRefeicao[];
}

interface RegistroRefeicao {
    id: string;
    idCardapio?: string;
    nome: string;
    tipo: string;
    calorias: number;
    proteinas: number;
    peso: number;
    created: string;
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
    created: Date;
}