
interface Ingrediente extends BaseItem{
    nome: string;
    calorias: number;
    proteinas: number;
    peso: number;
    unidade: string;
    idProduto: string;
    unidAltDesc: string;
    unidAltPeso: number;
    categoria?:string;
}


interface IngredienteAssistente extends BaseItem{
    nome: string;
    idProduto: string;
    categoria: string;
}