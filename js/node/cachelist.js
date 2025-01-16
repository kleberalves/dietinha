//transforma uma array de objetos adicionando a propriedade id no formato uuid

const fs = require("fs");
const crypto = require("crypto");
var path = require('path');

function transform() {
    const filesModels = fs.readdirSync(path.join(__dirname, '..'), { recursive: true });
    filesModels.forEach(async (file) => {

        if (file.indexOf(".") > -1) {
            console.log("'js/" + file + "',");
        }

    });
}

transform();
