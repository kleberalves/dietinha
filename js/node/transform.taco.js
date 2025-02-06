//transforma uma array de objetos adicionando a propriedade id no formato uuid

var path = require('path');

function transform() {

    var fs = require('fs');
    var tabela = JSON.parse(fs.readFileSync(path.join(__dirname, '..', "data", "TACO.json"), 'utf8'));

    var listaAlimentos = [];
    for (var i = 0; i < tabela.length; i++) {

        //Inserindo infos do leite desnatado
        if (tabela[i].id === 457) {
            listaAlimentos.push(
                {
                    "nome": tabela[i].description,
                    "categoria": tabela[i].category,
                    "calorias": 33,
                    "unidade": "ml",
                    "proteina": 3.5,
                    "gordura": 0
                }
            )
        } else {
            listaAlimentos.push({
                "id": tabela[i].id,
                "nome": tabela[i].description,
                "categoria": tabela[i].category,
                "calorias": Math.round(tabela[i].energy_kcal),
                "proteina": Math.round(tabela[i].protein_g),
                "gordura": Math.round(tabela[i].lipid_g),
                "carboidrato": Math.round(tabela[i].carbohydrate_g)
            })
        }
    }

    //Adicionando água para compor receitas
    listaAlimentos.push(
        {
            "id": 598,
            "nome": "Água filtrada",
            "categoria": "Minerais",
            "calorias": 0,
            "proteina": 0,
            "gordura": 0,
            "unidade": "ml"
        }
    );

    fs.writeFileSync(path.join(__dirname, '..', "data", "lista.alimentos.js"), "var listaAlimentos = " + JSON.stringify(listaAlimentos) + "; ");

}

transform();
