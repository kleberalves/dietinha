export { }
declare global {
    interface Dictionary {
        id?: string;
        key: string;
        value: string | number;
        idUser?: string;
    }
}