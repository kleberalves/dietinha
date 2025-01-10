function showMessage(msg, type) {
    var msgWindow = document.createElement("div");
    msgWindow.id = "msgWindow";
    msgWindow.classList.add("alert");
    msgWindow.classList.add(type);

    var msgNode = document.createTextNode(msg);
    msgWindow.appendChild(msgNode);

    var body = document.getElementsByTagName("body");
    body[0].appendChild(msgWindow);

    setTimeout(() => {
        document.getElementById("msgWindow").remove();
    }, msg.length * 150);
}