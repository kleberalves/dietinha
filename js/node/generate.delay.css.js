
const fs = require("fs");
var path = require('path');

var fileStr = "";

for (var i = 0; i < 100; i++) {
    fileStr += ".delay" + i + " { animation-delay: 0." + (i * 8).toString().padStart(2, '0') + "s; } ";
}

fs.writeFileSync(path.join(__dirname, '..', "..", "css", "animations.delay.css"), fileStr);
