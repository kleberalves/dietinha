//global 
var timedoutshowMessage = 0;

function showMessage(msg, type) {

    var msgWindow = createWindow(type);

    var msgNode = document.createTextNode(msg);
    msgWindow.appendChild(msgNode);

    timedoutshowMessage = setTimeout(() => {
        removeWindow();
    }, msg.length * 150);
}

function showConfirm(msg, callback) {

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
    btnCancelar.onclick = () => {
        removeWindow();
    }

    barActions.appendChild(btnCancelar);
}

function removeWindow() {
    document.getElementById("msgWindow").remove();
}

function createWindow(type) {

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

    return msgWindow;
}

function showWarning(msg) {
    showMessage(msg, "warning");
}