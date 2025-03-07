import { showError } from "./message.lib";

const getInputValue = (str) => {

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
export const validateFields = (fields: (FieldNumber | FieldValue)[]): boolean => {

    let errors: string = "Verifique e tente novamente: <br/><br/>";
    let valid: boolean = true;

    if (fields && fields.length > 0) {
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].msg) {
                errors += `- ${fields[i].msg} <br/>`;

                valid = false;
            }
        }

        if (!valid) {
            showError(errors);
        }
    }

    return valid;
}
export const getInputString = (id: string, msg: string): FieldValue => {

    let value = getInputValue(id);

    if(value){
        return {
            value: value.toString()
        }
    }

    return {
        msg: msg
    }

}
export const getInputNumber = (id: string, msg: string): FieldNumber => {

    let value = getInputValue(id);

    if (value) {
        if (typeof value === "string") {

            //Substitui vírgula por ponto se houver 
            value = value.split(",").join(".");

            if (isNaN(parseFloat(value))) {
                return {
                    msg: msg
                }
            }

            return {
                value: parseFloat(value)
            }
        } else if (typeof value === "number") {
            return {
                value: value
            }
        }
    }

    return {
        msg: msg
    }
}

export const getInputInt = (id: string, msg: string): FieldNumber => {

    let value = getInputValue(id);

    if (value) {
        if (typeof value === "string") {

            if (isNaN(parseInt(value))) {
                return {
                    msg: msg
                }
            }

            return {
                value: parseInt(value)
            }
        } else if (typeof value === "number") {
            return {
                value: value
            }
        }
    }

    return {
        msg: msg
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


