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
}