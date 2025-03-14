/// <reference path="definitions/alimento.d.ts" />
/// <reference path="definitions/ingrediente.d.ts" />
/// <reference path="definitions/dictionary.d.ts" />
/// <reference path="definitions/components/cardapio.d.ts" />
/// <reference path="definitions/components/meta-diaria.d.ts" />
/// <reference path="definitions/components/ingredientes-selecionados.d.ts" />
/// <reference path="definitions/lib/forms.ts" />

interface BaseItem {
    id: string;
    created: string;
    updated?: string;
    deleted?: string;
}

interface CardapioItem extends BaseItem {
    nome: string;
    tipo: string;
    calorias: number;
    proteinas: number;
    peso: number;
    ingredientes: Ingrediente[];
}

interface RefeicaoDia {
    dia: string;
    registros: RegistroRefeicaoItem[];
}

interface RegistroRefeicaoItem {
    id: string;
    idCardapio?: string;
    nome: string;
    tipo: string;
    calorias: number;
    proteinas: number;
    peso: number;
    created: string;
    updated?: string;
    deleted?: string;
}

interface UnidadeAlt {
    peso: number;
    desc: string;
}

interface Perfil {
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
    created: string;
    updated?: string;
    deleted?: string;
}