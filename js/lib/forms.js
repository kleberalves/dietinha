function swapForms(idx) {

    var tabs = document.getElementsByClassName('tab');
    var state = tabs[idx].getAttribute("state");

    if (state === undefined || state === null || state === "open") {
        tabs[idx].setAttribute("state", "close");

        //Define temporariamente a altura em pixels pelo tamanho interno (form)
        //substituindo o parâmento "auto"
        tabs[idx].style.height = tabs[idx].children[1].clientHeight;

        setTimeout(() => {
            tabs[idx].style.height = 42;
        }, 150);
    } else {
        var newHeight = tabs[idx].children[1].clientHeight;
        tabs[idx].setAttribute("state", "open");

        setTimeout(() => {
            tabs[idx].style.height = newHeight;
            setTimeout(() => {
                tabs[idx].style.height = "auto";
            }, 250);
        }, 150);
    }
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