//global 
let timedoutshowMessage: any = 0;

const removeWindow = () => {
    let msgWindow = document.getElementById("msgWindow");
    if (msgWindow) {
        msgWindow.remove();
    }
    let main = document.getElementById("main");
    if (main) {
        main.classList.remove("blur");
    }
}

const createWindow = (type) => {

    var win = document.getElementById("msgWindow");
    if (win !== null) {
        win.remove();
        clearTimeout(timedoutshowMessage);
    }

    var msgWindow = document.createElement("div");
    msgWindow.id = "msgWindow";
    msgWindow.classList.add("alert");
    msgWindow.classList.add(type);

    var body = document.getElementsByTagName("body");
    body[0].appendChild(msgWindow);

    var element = document.getElementById("main");
    if (element) {
        element.classList.add("blur");
    }

    return msgWindow;
}

export const showMessage = (msg, type) => {

    var msgWindow = createWindow(type);

    var msgNode = document.createTextNode(msg);
    msgWindow.appendChild(msgNode);

    timedoutshowMessage = setTimeout(() => {
        removeWindow();
    }, msg.length * 150);
}

export const showConfirm = (msg, callback) => {

    var msgWindow = createWindow("warning");

    var msgNode = document.createTextNode(msg);
    msgWindow.appendChild(msgNode);

    var barActions = document.createElement("div");
    barActions.classList.add("bar-actions");
    msgWindow.appendChild(barActions);


    var btnConfirm = document.createElement("button");
    btnConfirm.innerText = "Ok";
    btnConfirm.classList.add("btn-ok");
    btnConfirm.onclick = () => {
        removeWindow();
        callback();
    }

    barActions.appendChild(btnConfirm);

    var btnCancelar = document.createElement("button");
    btnCancelar.innerText = "Cancelar";
    btnCancelar.classList.add("btn-cancelar");
    btnCancelar.classList.add("delay1");
    btnCancelar.onclick = () => {
        removeWindow();
    }

    barActions.appendChild(btnCancelar);
}



export const showWarning = (msg) => {
    showMessage(msg, "warning");
}


export const showError = (msg) => {
    showMessage(msg, "error");
}