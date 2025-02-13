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