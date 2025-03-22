/// <reference path="definitions/processamento-assistente.d.ts" />
/// <reference path="definitions/alimento.d.ts" />
/// <reference path="definitions/ingrediente.d.ts" />
/// <reference path="definitions/dictionary.d.ts" />
/// <reference path="definitions/components/cardapio.d.ts" />
/// <reference path="definitions/components/meta-diaria.d.ts" />
/// <reference path="definitions/components/ingredientes-selecionados.d.ts" />
/// <reference path="definitions/lib/forms.ts" />

interface Edit extends BaseItem {
    store: string;
    itemRef: BaseItem;
}

interface BaseItem {
    id?: string;
    created?: string;
    updated?: string;
    deleted?: string;
}

interface CardapioItem extends BaseItem {
    nome: string;
    tipo: string;
    calorias: number;
    proteinas: number;
    origem?: string;
    peso: number;
    ingredientes: Ingrediente[];
}

interface RefeicaoDia {
    dia: string;
    registros: RegistroRefeicaoItem[];
}

interface RegistroRefeicaoItem extends BaseItem {
    nome: string;
    tipo: string;
    calorias: number;
    proteinas: number;
    peso: number;
}

interface UnidadeAlt {
    peso: number;
    desc: string;
}

interface Perfil extends BaseItem {
    altura: number;
    atividadeFisica: number;
    ganharMassa: number;
    genero: string;
    idade: number;
    manterPeso: number;
    objetivo: string;
    perderPeso: number;
    peso: number;
    proteinas: number;
    tmb: number
}

interface AuthInfo extends BaseItem {
    email: string;
    name: string;
    token: string;
    lastSync?: string;
    activeToken?: string;
    activeTokenMode?: string;
    profiles: any[];
}

interface ISync {
    cardapioItems: CardapioItem[];
    perfil: Perfil | null;
    registroRefeicaoItems: RegistroRefeicaoItem[];
    processamentosItems: ProcessamentoAssistente[];
}
