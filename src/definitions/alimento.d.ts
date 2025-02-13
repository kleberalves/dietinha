export { }
declare global {
    interface Alimento {
        id: number;
        calorias: number;
        proteina: number;
        nome: string;
        categoria: string;
        unidade: string;
    }
}