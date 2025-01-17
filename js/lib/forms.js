function swapForms(idx) {

    var tabs = document.getElementsByClassName('tab');
    var state = tabs[idx].classList.contains("close");

    //Se não tem o close é porque está aberto. Se está aberto, quer fechar.
    if (!state) {
        tabs[idx].classList.remove("open");

        //Define temporariamente a altura em pixels pelo tamanho interno (form)
        //substituindo o value "auto"
        //60 do margint-top do .form dentro da tab
        tabs[idx].style.height = tabs[idx].children[1].clientHeight+60;

        setTimeout(() => {
            tabs[idx].classList.add("close");
            tabs[idx].style.height = 42;
        }, 150);
    } else {

        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].id !== tabs[idx].id) {
                closeForm(tabs[i].id);
            }
        }

        var newHeight = tabs[idx].children[1].clientHeight;

        setTimeout(() => {
            tabs[idx].style.height = newHeight;
            tabs[idx].classList.add("open");
            tabs[idx].classList.remove("close");
            setTimeout(() => {
                tabs[idx].style.height = "auto";
            }, 250);
        }, 150);
    }
}

function getTab(tabId) {

    var tabs = document.getElementsByClassName('tab');
    var tab = null;

    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].id === tabId) {
            tab = tabs[i];
        }
    }
    return tab;
}

function closeForm(tabId) {

    var tab = getTab(tabId);
    if (isNullOrEmpty(tab)) {
        return;
    }

    //Só fecha se estiver aberto
    if (tab.classList.contains("open")) {

        tab.classList.remove("open");

        //Define temporariamente a altura em pixels pelo tamanho interno (form)
        //substituindo o parâmento "auto"
        tab.style.height = tab.children[1].clientHeight+60;

        setTimeout(() => {
            tab.style.height = 42;
            tab.classList.add("close");
        }, 150);
    }

}

function openForm(tabId) {

    var tab = getTab(tabId);
    if (isNullOrEmpty(tab)) {
        return;
    }

    var newHeight = tab.children[1].clientHeight;

    setTimeout(() => {
        tab.style.height = newHeight;
        tab.classList.add("open");
        tab.classList.remove("close");
        setTimeout(() => {
            tab.style.height = "auto";
        }, 250);
    }, 150);
}

function getRadiosCheck(id) {
    var field = document.querySelector('input[name=' + id + ']:checked');

    if (field !== null) {
        return field.value;
    } else {
        return null;
    }
}

function setRadiosCheck(id, value) {

    var radios = document.querySelectorAll('input[name="' + id + '"]');

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].value === value.toString()) {
            radios[i].checked = true;
        }
    }
}

function setNumberField(id, value) {
    document.getElementById(id).value = value;
}