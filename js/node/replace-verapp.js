
const crypto = require("crypto");
var path = require('path');

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}


var fs = require('fs');
var pathPage = path.join(__dirname, '..', "..", "index.html")
var pageContent = fs.readFileSync(pathPage, 'utf8');

pageContent = pageContent.split("VerAPP").join(uuidv4());

fs.writeFileSync(pathPage, pageContent);
