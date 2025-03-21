import { removeCarecEspec } from "./treatments";
/**
 * Consulta uma frase (mesmo com espaços) e busca as palavras no campo especificado independente da ordem. 
 * @param list lista array de objetos
 * @param search frase de consulta
 * @param field campo do objeto a ser pesquisado
 * @param limit (opcional) total de limite de resultado. Padrão é 20  
 * @returns 
 */
export const searchList = <T>(list: Array<T>, search: string, field: string, limit?: number) => {

    let resultList: T[] = [];

    let value = removeCarecEspec(search.toLowerCase());

    if (value === undefined) {
        return [] as T[];
    }

    let values: string[] = value.split(" ");

    for (var i = 0; i < list.length; i++) {

        if (resultList.length < (limit !== undefined ? limit : 20)) {
            let item = list[i];
            var fieldValue = item[field];
            fieldValue = removeCarecEspec(fieldValue);

            let cont = 0;
            for (var s = 0; s < values.length; s++) {
                if (fieldValue.indexOf(values[s]) > -1) {
                    cont++;
                }
            }

            if (cont === values.length) {
                resultList.push(list[i]);
            }
        }
    }

    return resultList;
}