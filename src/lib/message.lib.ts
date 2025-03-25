//global 
let timedoutshowMessage: any = 0;
import { Hole, html, render } from "uhtml";

export const removeWindow = () => {
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

const configActions = (msgWindow: HTMLDivElement, callback: () => void) => {

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

    barActions.appendChild(btnCancelar)
}

export const showLoading = () => {

    //TODO Adicionar o window.stop() para cancelar as requisições infinitas

    var msgWindow = createWindow("none");
    render(msgWindow, html`
    <div className="loading">
    <svg width="59" height="59" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#57bfd4" stroke-width="3" r="10" stroke-dasharray="30 10" transform="rotate(203.862 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="0.6s" begin="0s" repeatCount="indefinite"/></circle><circle cx="50" cy="50" fill="none" stroke="#57bfd4" stroke-width="3" r="22" stroke-dasharray="110 110" transform="rotate(203.862 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="0.7s" begin="0s" repeatCount="indefinite"/></circle>
        <circle cx="50" cy="50" fill="none" stroke="#57bfd4" stroke-width="3" r="35" stroke-dasharray="190 190" transform="rotate(203.862 50 50)">
        <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
        </circle>
        </svg>
    </div>`);

}

export const showPopup = (html: Hole, onConfirm: () => void, onRender?: () => void) => {

    var msgWindow = createWindow("default");
    render(msgWindow, html);
    configActions(msgWindow, onConfirm);

    if (onRender) {
        onRender();
    }

    return msgWindow;
}

const showMessage = (msg, type) => {

    var msgWindow = createWindow(type);

    var msgNode = document.createElement("div");
    msgWindow.appendChild(msgNode);
    msgNode.innerHTML = msg;

    if (type !== "success-mini") {
        var barActions = document.createElement("div");
        barActions.classList.add("bar-actions");
        msgWindow.appendChild(barActions);

        var btnConfirm = document.createElement("button");
        btnConfirm.innerText = "Ok";
        btnConfirm.classList.add("btn-ok");
        btnConfirm.onclick = () => {
            removeWindow();
        }

        barActions.appendChild(btnConfirm);
    }
    // timedoutshowMessage = setTimeout(() => {
    //     removeWindow();
    // }, msg.length * 150);

    return msgWindow;
}

export const showConfirm = (msg, callback: () => void) => {

    clearTimeout(timedoutshowMessage);

    var msgWindow = createWindow("warning");

    var msgNode = document.createTextNode(msg);
    msgWindow.appendChild(msgNode);

    configActions(msgWindow, callback);
}

export const showOk = (msg: string) => {
    let window = showMessage(msg, "success");

    var element = document.getElementById("main");
    if (element) {
        element.classList.remove("blur");
    }

    window.onclick = () => {
        removeWindow();
    }
}

export const showOkMini = (msg: string) => {
    let window = showMessage(msg, "success-mini");

    var element = document.getElementById("main");
    if (element) {
        element.classList.remove("blur");
    }

    clearTimeout(timedoutshowMessage);

    timedoutshowMessage = setTimeout(() => {
        removeWindow();
    }, msg.length * 250);

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