//global 
let timedoutshowMessage: any = 0;
import { Hole, render } from "uhtml";

const removeWindow = () => {
    let msgWindow = document.getElementById("msgWindow");
    if (msgWindow) {
        msgWindow.classList.remove("show-top");
        msgWindow.classList.add("close-bottom");

        timedoutshowMessage = setTimeout(() => {
            msgWindow.remove();
            let main = document.getElementById("main");
            if (main) {
                main.classList.remove("blur");
            }
        }, 400);
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
    msgWindow.classList.add("show-top");
    msgWindow.classList.add(type);

    var body = document.getElementsByTagName("body");
    body[0].appendChild(msgWindow);

    if (type !== "success") {
        var element = document.getElementById("main");
        if (element) {
            element.classList.add("blur");
        }
    }

    return msgWindow;
}

const configActions = (msgWindow:HTMLDivElement, callback:() => void) => {

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

export const showPopup = (html: Hole, callback: () => void) => {

    var msgWindow = createWindow("default");    
    render(msgWindow, html);
    configActions(msgWindow, callback);

    return msgWindow;
}

export const showMessage = (msg, type) => {

    var msgWindow = createWindow(type);

    var msgNode = document.createTextNode(msg);
    msgWindow.appendChild(msgNode);

    timedoutshowMessage = setTimeout(() => {
        removeWindow();
    }, msg.length * 150);

    return msgWindow;
}

export const showConfirm = (msg, callback:() => void) => {

    var msgWindow = createWindow("warning");

    var msgNode = document.createTextNode(msg);
    msgWindow.appendChild(msgNode);

    configActions(msgWindow, callback);
}

export const showOk = (msg: string) => {
    let window = showMessage(msg, "success");
    window.onclick = () => {
        removeWindow();
    }
}

export const showWarning = (msg: string) => {
    let window = showMessage(msg, "warning");
    window.onclick = () => {
        removeWindow();
    }
}

export const showError = (msg: string) => {
    let window = showMessage(msg, "error");
    window.onclick = () => {
        removeWindow();
    }
}