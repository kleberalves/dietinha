//global 
var timedoutshowMessage = 0;

function showMessage(msg, type) {

    var win = document.getElementById("msgWindow");
    if (win !== null) {
        win.remove();
        clearTimeout(timedoutshowMessage);
    }

    var msgWindow = document.createElement("div");
    msgWindow.id = "msgWindow";
    msgWindow.classList.add("alert");
    msgWindow.classList.add(type);

    var msgNode = document.createTextNode(msg);
    msgWindow.appendChild(msgNode);

    var body = document.getElementsByTagName("body");
    body[0].appendChild(msgWindow);

    timedoutshowMessage = setTimeout(() => {
        document.getElementById("msgWindow").remove();
    }, msg.length * 150);
}