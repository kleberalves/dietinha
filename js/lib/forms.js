function swapForms(idx) {

    var tabs = document.getElementsByClassName('tab');
    var state = tabs[idx].getAttribute("state");

    if (state === undefined || state === null || state === "open") {
        tabs[idx].setAttribute("state", "close");

        //Define temporariamente a altura em pixels pelo tamanho interno (form)
        //substituindo o parâmento "auto"
        tabs[idx].style.height = tabs[idx].children[1].clientHeight;

        setTimeout(() => {
            tabs[idx].style.height = 45;
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