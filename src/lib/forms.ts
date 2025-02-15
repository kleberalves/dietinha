import { isNullOrEmpty } from "./treatments";

export const getInputValue = (str) => {

    let element = document.getElementById(str) as HTMLInputElement;

    if (element === null || element === undefined) {
        element = document.querySelector(str) as HTMLInputElement;

        if (element === null || element === undefined) {
            return;
        }
    }

    return element.value;
}

export const getInputNumber = (str) => {

    let value = getInputValue(str);

    if (value)
        return parseFloat(value);
}

export const getInputInt = (str) => {

    let value = getInputValue(str);

    if (value)
        return parseInt(value);
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
        if (radios[i].value === value.toString()) {
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


