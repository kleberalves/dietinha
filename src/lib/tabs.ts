import { isNullOrEmpty } from "./treatments";

export function getTab(tabId: string) {

    let tabs = document.getElementsByClassName('tab');

    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].id === tabId) {
            return tabs[i];
        }
    }
}

export const swapTabs = (id: string) => {

    var tabs = document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLDivElement>;

    for (let t = 0; t < tabs.length; t++) {
        let tab = tabs[t];
        if (tab.id === id) {

            var state = tab.classList.contains("close");

            //Se não tem o close é porque está aberto. Se está aberto, quer fechar.
            if (!state) {
                tab.classList.remove("open");

                //Define temporariamente a altura em pixels pelo tamanho interno (form)
                //substituindo o value "auto"
                //60 do margint-top do .form dentro da tab
                tab.style.height = (tab.children[1].clientHeight + 60).toString();

                setTimeout(() => {
                    tab.classList.add("close");
                    tab.style.height = (42).toString();
                }, 150);
            } else {

                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].id !== tab.id) {
                        closeTab(tabs[i].id);
                    }
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

        } else {
            closeTab(tabs[t].id);
        }
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