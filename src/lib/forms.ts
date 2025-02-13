import { isNullOrEmpty } from "./treatments";

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

export function getTab(tabId:string) {

    let tabs = document.getElementsByClassName('tab');

    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].id === tabId) {
            return tabs[i];
        }
    }
}

export function closeForm(tabId:string) {

    var tab = getTab(tabId) as HTMLDivElement;
    if (isNullOrEmpty(tab)) {
        return;
    }

    //Só fecha se estiver aberto
    if (tab !== undefined && tab.classList.contains("open")) {

        tab.classList.remove("open");

        //Define temporariamente a altura em pixels pelo tamanho interno (form)
        //substituindo o parâmento "auto"
        tab.style.height = (tab.children[1].clientHeight + 60).toString();

        setTimeout(() => {
            tab.style.height = (42).toString();
            tab.classList.add("close");
        }, 150);
    }

}

export function openForm(tabId:string) {

    var tab = getTab(tabId) as HTMLDivElement;
    if (isNullOrEmpty(tab)) {
        return;
    }

    var newHeight = tab.children[1].clientHeight;

    setTimeout(() => {
        tab.style.height = newHeight.toString();
        tab.classList.add("open");
        tab.classList.remove("close");
        setTimeout(() => {
            tab.style.height = "auto";
        }, 250);
    }, 150);
}
