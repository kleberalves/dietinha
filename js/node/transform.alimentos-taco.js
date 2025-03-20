var path = require('path');
const crypto = require("crypto");

throw new Error("Script utilizado apenas uma vez para extrair e formatar a lista TACO original.")

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

function transform() {

    var fs = require('fs');
    var tabela = JSON.parse(fs.readFileSync(path.join(__dirname, '..', "data", "TACO.json"), 'utf8'));

    var listaAlimentos = [];
    var listaAlimentosSemCalorias = [];

    for (var i = 0; i < tabela.length; i++) {

        if (typeof tabela[i].energy_kcal === "string" && tabela[i].energy_kcal === "*") {
            listaAlimentosSemCalorias.push({
                "id": tabela[i].id.toString(),
                "nome": tabela[i].description.split(",").join("")
            });
        } else {

            var alimento = {
                "id": uuidv4(),
                "idTaco": tabela[i].id.toString(),
                "nome": tabela[i].description.split(",").join(""),
                "categoria": tabela[i].category,
                "calorias": Math.round(tabela[i].energy_kcal),
                "proteina": Math.round(tabela[i].protein_g),
                "gordura": Math.round(tabela[i].lipid_g),
                "carboidrato": Math.round(tabela[i].carbohydrate_g)
            };

            switch (alimento.idTaco) {
                case "463":
                    //Troca o nome de mozarela para mussarela
                    alimento["nome"] = "Queijo mussarela";
                    break;
            }

            listaAlimentos.push(alimento);
        }
    }

    // fs.writeFileSync(path.join(__dirname, '..', "data", "lista.alimentos-taco.json"), JSON.stringify(listaAlimentos));
    // fs.writeFileSync(path.join(__dirname, '..', "data", "lista.alimentos-taco-ausentes.json"), JSON.stringify(listaAlimentosSemCalorias));
}

transform();
