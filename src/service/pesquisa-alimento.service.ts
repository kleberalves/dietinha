import { removeCarecEspec } from "../lib/treatments";

declare var listaAlimentos: Alimento[];

export const consultaAlimento = (search: string) => {

    let resultList:Alimento[] = [];
    
    let value = removeCarecEspec(search.toLowerCase());

    if(value === undefined){
        return [] as Alimento[];
    }

    let values: string[] = value.split(" ");

    for (var i = 0; i < listaAlimentos.length; i++) {

        if (resultList.length < 20) {
            var nome = listaAlimentos[i].nome;
            nome = removeCarecEspec(nome);

            let cont = 0;
            for (var s = 0; s < values.length; s++) {
                if (nome.indexOf(values[s]) > -1) {
                    cont++;
                }
            }

            if (cont === values.length) {
                resultList.push(listaAlimentos[i]);
            }
        }
    }

   return resultList;
}