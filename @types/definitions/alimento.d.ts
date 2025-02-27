export { }
declare global {
    interface Alimento {
        id: string;
        calorias: number;
        proteina: number;
        nome: string;
        categoria: string;
        unidade: string;
    }

    interface AlimentoUnidade {
        idAlimento: string;
        label: string;
        rating: number;
    }
}