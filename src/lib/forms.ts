export const getInputValue = (str) => {

    let element = document.getElementById(str) as HTMLInputElement;

    if (element === null || element === undefined) {
        element = document.querySelector(str) as HTMLInputElement;

        if (element === null || element === undefined) {
            return;
        }
    }

    if (element.value) {
        return element.value;
    }

    if (element.valueAsNumber) {
        return element.valueAsNumber;
    }
}

export const getInputNumber = (str) => {

    let value = getInputValue(str);

    if (value) {
        if (typeof value === "string") {

           //Substitui vírgula por ponto se houver 
            value = value.split(",").join(".");

            return parseFloat(value);
        } else if (typeof value === "number") {
            return value;
        }
    }
}

export const getInputInt = (str) => {

    let value = getInputValue(str);

    if (value) {
        if (typeof value === "string") {
            return parseInt(value);
        } else if (typeof value === "number") {
            return value;
        }
    }
}


export const getRadiosCheck = (id: String) => {
    var field = document.querySelector('input[name=' + id + ']:checked') as HTMLInputElement;

    if (field !== null) {
        return field.value;
    } else {
        return null;
    }
}

export const setRadiosCheck = (id, value) => {

    var radios = document.querySelectorAll<HTMLInputElement>('input[name="' + id + '"]');

    for (var i = 0; i < radios.length; i++) {
        if (value && value !== null && radios[i].value === value.toString()) {
            radios[i].checked = true;
        }
    }
}

export const setNumberField = (id, value) => {
    let input = document.getElementById(id) as HTMLInputElement;

    if (input !== null) {
        input.value = value;
    }
}


