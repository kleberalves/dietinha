/** Também valida se é undefined */
export const isNullOrEmpty = (obj) => {
    if (obj === undefined || obj === null || obj === "") {
        return true;
    } else {
        return false;
    }
}

/** Remove os caracteres especiais e ainda retorna como lower case. */
export const removeCarecEspec = (str) => {

    if (!isNullOrEmpty(str)) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
}


export const getDif = (date: string) => {
    let now = convertDateLocal(localISOString()).getTime();
    let ref = convertDateLocal(date).getTime();

    let dif = Math.round((now - ref) / 60000);

    if (dif > 60) {
        dif = Math.round(dif / 60);
        return `${dif} hora(s)`;
    }

    dif = Math.round(dif);

    if (dif === 0) {
        return `Agora`;
    }
    
    return `${Math.round(dif)} min`;
}

/** Converte uma string Date no formato ISO e retorna em uma das opções: dd/mm/yyyy, dd/mm e hh:MM */
export const formatDate = (date: Date | string, format: string): string => {

    if (date === undefined || date === null) {
        throw new Error("Parâmetro date não informado.");
    }

    if (typeof date === "string") {
        //Remove o timezone da String
        date = new Date(date.substring(0, 19));
    }

    let day: string = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString();
    let month: string = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1).toString();
    let year: string = date.getFullYear().toString();

    let hour: string = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours().toString();
    let minutes: string = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes().toString();


    if (format === "dd/mm/yyyy") {
        return `${day}/${month}/${year}`;
    }

    if (format === "dd/mm") {
        return `${day}/${month}`;
    }

    if (format === "hh:MM") {
        return `${hour}:${minutes}`;
    }

    if (format === "dd/mm hh:MM") {
        return `${day}/${month} ${hour}:${minutes}`;
    }

    return `${year}-${month}-${day}`;
}
/** Retorna o DateTime.Now no formato ISO com o TimeZone local aplicado */
export const localISOString = () => {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    return (new Date(Date.now() - tzoffset)).toISOString()
}

export const convertDateLocal = (dateStr: string) => {
    //Corrige a data para o fuso horário de São Paulo
    //TODO colocar na core
    let date = new Date(dateStr);

    var tzoffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + tzoffset)
}

/** Converte strings "true" e "1" para true.
 * Qualquer outra info é false.
 */
export const parseBool = (v: string) => {
    if (v === "true" || v === "1") {
        return true;
    } else {
        return false;
    }
}