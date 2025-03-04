import { searchList } from "../lib/search.lib";

declare var listaAlimentos: Alimento[];

export const consultaAlimento = (search: string) => {

    return searchList<Alimento>(listaAlimentos, search, "nome");
    
}

