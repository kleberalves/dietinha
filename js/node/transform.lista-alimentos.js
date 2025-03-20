var path = require('path');
const crypto = require("crypto");

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

function transform() {

    var fs = require('fs');
    var listaAlimentos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', "data", "lista.alimentos.json"), 'utf8'));

    //Exclusão de alimentos CRUS
    //    var listaAlimentos = [];
    var tabela = [];

    for (var i = 0; i < listaAlimentos.length; i++) {

        if (listaAlimentos[i].nome.toLowerCase().indexOf("cru") > -1) {
            if (listaAlimentos[i].nome.toLowerCase().indexOf("carne bovina") === -1
                && listaAlimentos[i].nome.toLowerCase().indexOf("porco") === -1
                && listaAlimentos[i].nome.toLowerCase().indexOf("frango") === -1
                && listaAlimentos[i].nome.toLowerCase().indexOf("feijão") === -1
                && listaAlimentos[i].nome.toLowerCase().indexOf("arroz") === -1) {
                tabela.push(listaAlimentos[i]);
            } else {
                console.log(listaAlimentos[i].nome);
            }
        } else if (listaAlimentos[i].categoria !== "Alimentos preparados") {
            tabela.push(listaAlimentos[i]);
        }
    }

    //Script para adicionar produtos manualmente 
    //TODO adicionar CRUD na API
    // listaAlimentos.push(
    //     {
    //         "id": uuidv4(),
    //         "nome": "Long neck Heineken Cerveja",
    //         "categoria": "Cervejas",
    //         "calorias": 42,
    //         "carboidratos": 3.3,
    //         "proteina": 0.4,
    //         "gordura": 0,
    //         "unidade": "ml"
    //     }
    // );
    // fs.writeFileSync(path.join(__dirname, '..', "data", "lista.alimentos.json"), JSON.stringify(listaAlimentos));

    fs.writeFileSync(path.join(__dirname, '..', "data", "lista.alimentos.js"), "var listaAlimentos = " + JSON.stringify(tabela) + "; ");
}

transform();
