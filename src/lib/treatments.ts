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

    if (isNullOrEmpty(str)) {
        throw new Error("Parâmetro vazio ao remover os caracteres especiais.");
    }

    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export const formatDate = (date: Date | string, format: string): string => {

    if (date === undefined || date === null) {
        throw new Error("Parâmetro date não informado.");
    }

    if (typeof date === "string") {
        //Remove o timezone da String
        date = new Date(date.substring(0,19));
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


    return `${year}-${month}-${day}`;

}

export const localISOString = () => {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    return (new Date(Date.now() - tzoffset)).toISOString()
}