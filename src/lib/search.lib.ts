import { removeCarecEspec } from "./treatments";

export const searchList = <T>(list:Array<T>, search: string, field:string) => {

    let resultList:T[] = [];
    
    let value = removeCarecEspec(search.toLowerCase());

    if(value === undefined){
        return [] as T[];
    }

    let values: string[] = value.split(" ");

    for (var i = 0; i < list.length; i++) {

        if (resultList.length < 20) {
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