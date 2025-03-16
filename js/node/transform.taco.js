var path = require('path');

const checkName = (nome, value) => {
    if (nome.toLowerCase().indexOf(value) > -1) {
        return true;
    }

    return false;
}

function transform() {

    var fs = require('fs');
    var tabela = JSON.parse(fs.readFileSync(path.join(__dirname, '..', "data", "TACO.json"), 'utf8'));

    var listaAlimentos = [];
    var listaAlimentosUnidades = [];
    var listaAlimentosSemCalorias = [];

    for (var i = 0; i < tabela.length; i++) {

        if (typeof tabela[i].energy_kcal === "string" && tabela[i].energy_kcal === "*") {
            listaAlimentosSemCalorias.push({
                "id": tabela[i].id.toString(),
                "nome": tabela[i].description.split(",").join("")
            });
        } else {

            var alimento = {
                "id": tabela[i].id.toString(),
                "nome": tabela[i].description.split(",").join(""),
                "categoria": tabela[i].category,
                "calorias": Math.round(tabela[i].energy_kcal),
                "proteina": Math.round(tabela[i].protein_g),
                "gordura": Math.round(tabela[i].lipid_g),
                "carboidrato": Math.round(tabela[i].carbohydrate_g)
            };

            switch (tabela[i].id) {
                case "463":
                    //Troca o nome de mozarela para mussarela
                    alimento["nome"] = "Queijo mussarela";
                    break;
            }

            listaAlimentos.push(alimento);
        }
    }

    //Inserindo infos do leite desnatado
    listaAlimentos.push(
        {
            "id": "457",
            "nome": "Leite de vaca desnatado",
            "categoria": "Leite e derivados",
            "calorias": 33,
            "proteina": 3.5,
            "gordura": 0,
            "unidade": "ml"
        }
    );

    //Inserindo infos do leite desnatado
    listaAlimentos.push(
        {
            "id": "458",
            "nome": "Leite de vaca integral",
            "categoria": "Leite e derivados",
            "calorias": 61,
            "proteina": 3.15,
            "gordura": 3.25,
            "unidade": "ml"
        }
    );

    //Adicionando água para compor receitas
    listaAlimentos.push(
        {
            "id": "598",
            "nome": "Água filtrada",
            "categoria": "Minerais",
            "calorias": 0,
            "proteina": 0,
            "gordura": 0,
            "unidade": "ml"
        }
    );

    listaAlimentos.push(
        {
            "id": "599",
            "nome": "Farinha de aveia",
            "categoria": "Cereais",
            "calorias": 380,
            "proteina": 14.5,
            "gordura": 0
        }
    );

    listaAlimentos.push(
        {
            "id": "600",
            "nome": "Farinha de amendoim",
            "categoria": "Cereais",
            "calorias": 585,
            "proteina": 26,
            "gordura": 0
        }
    );

    listaAlimentos.push(
        {
            "id": "601",
            "nome": "Extrato de soja",
            "categoria": "Cereais",
            "calorias": 400,
            "proteina": 35.7,
            "gordura": 0
        }
    );

    listaAlimentos.push(
        {
            "id": "602",
            "nome": "Macarrão cozido",
            "categoria": "Massas",
            "calorias": 158,
            "proteina": 6,
            "gordura": 0
        }
    );

    listaAlimentos.push(
        {
            "id": "603",
            "nome": "Latão Heineken Cerveja",
            "categoria": "Cervejas",
            "calorias": 44,
            "carboidratos": 3.3,
            "proteina": 0.4,
            "gordura": 0, 
            "unidade": "ml"
        }
    );

    
    listaAlimentos.push(
        {
            "id": "604",
            "nome": "Long neck Heineken Cerveja",
            "categoria": "Cervejas",
            "calorias": 42,
            "carboidratos": 3.3,
            "proteina": 0.4,
            "gordura": 0,
            "unidade": "ml"
        }
    );


    fs.writeFileSync(path.join(__dirname, '..', "data", "lista.alimentos.js"), "var listaAlimentos = " + JSON.stringify(listaAlimentos) + "; ");
    fs.writeFileSync(path.join(__dirname, '..', "data", "lista.alimentos.ausentes.js"), "var listaAlimentosAusentes = " + JSON.stringify(listaAlimentosSemCalorias) + "; ");

    //Cria a lista de unidades
    for (var i = 0; i < listaAlimentos.length; i++) {

        var alimentoUnidade = {};
        var alimento = listaAlimentos[i];

        if (checkName(alimento.nome, "ovo") &&
            checkName(alimento.nome, "galinha")) {
            alimentoUnidade = {
                "idAlimento": alimento.id,
                "label": "Unidade(s)",
                "rating": 30
            }

        } else if (checkName(alimento.nome, "pão") &&
            checkName(alimento.nome, "francês")) {
            alimentoUnidade = {
                "idAlimento": alimento.id,
                "label": "Unidade(s)",
                "rating": 35
            }

        } else if (checkName(alimento.nome, "arroz") ||
            checkName(alimento.nome, "feijão") ||
            checkName(alimento.nome, "leite") ||
            checkName(alimento.nome, "farinha")) {
            alimentoUnidade = {
                "idAlimento": alimento.id,
                "label": "Colher(es) de sopa",
                "rating": 30
            }

        } else if (checkName(alimento.nome, "pão") &&
            checkName(alimento.nome, "forma")) {
            alimentoUnidade = {
                "idAlimento": alimento.id,
                "label": "Fatia(s) de pão de forma",
                "rating": 25
            }

        } else if (checkName(alimento.nome, "mortadela") ||
            checkName(alimento.nome, "mussarela")) {
            alimentoUnidade = {
                "idAlimento": alimento.id,
                "label": "Fatia(s)",
                "rating": 25
            }

        } else if (checkName(alimento.nome, "ovo") &&
            checkName(alimento.nome, "codorna")) {
            alimentoUnidade = {
                "idAlimento": alimento.id,
                "label": "Unidade(s)",
                "rating": 10
            }
        } else if (checkName(alimento.nome, "banana")) {
            alimentoUnidade = {
                "idAlimento": alimento.id,
                "label": "Unidade(s)",
                "rating": 70
            }
        } else if (checkName(alimento.nome, "latão")) {
            alimentoUnidade = {
                "idAlimento": alimento.id,
                "label": "Unidade(s)",
                "rating": 473
            }
        } else if (checkName(alimento.nome, "long neck")) {
            alimentoUnidade = {
                "idAlimento": alimento.id,
                "label": "Unidade(s)",
                "rating": 330
            }
        }

        listaAlimentosUnidades.push(alimentoUnidade);
    }


    fs.writeFileSync(path.join(__dirname, '..', "data", "lista.alimentos.unidades.js"), "var listaAlimentosUnidades = " + JSON.stringify(listaAlimentosUnidades) + "; ");

}

transform();
