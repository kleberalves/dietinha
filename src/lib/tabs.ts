import { isNullOrEmpty } from "./treatments";

export function getTab(tabId: string) {

    let tabs = document.getElementsByClassName('tab');

    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].id === tabId) {
            return tabs[i];
        }
    }
}

export const swapTabs = (idx) => {

    var tabs = document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLDivElement>;
    var state = tabs[idx].classList.contains("close");

    //Se não tem o close é porque está aberto. Se está aberto, quer fechar.
    if (!state) {
        tabs[idx].classList.remove("open");

        //Define temporariamente a altura em pixels pelo tamanho interno (form)
        //substituindo o value "auto"
        //60 do margint-top do .form dentro da tab
        tabs[idx].style.height = (tabs[idx].children[1].clientHeight + 60).toString();

        setTimeout(() => {
            tabs[idx].classList.add("close");
            tabs[idx].style.height = (42).toString();
        }, 150);
    } else {

        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].id !== tabs[idx].id) {
                closeTab(tabs[i].id);
            }
        }

        var newHeight = tabs[idx].children[1].clientHeight;

        setTimeout(() => {
            tabs[idx].style.height = newHeight.toString();
            tabs[idx].classList.add("open");
            tabs[idx].classList.remove("close");
            setTimeout(() => {
                tabs[idx].style.height = "auto";
            }, 250);
        }, 150);
    }
}

export function closeTab(tabId: string) {

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

export function openTab(tabId: string) {

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