var path = require('path');

const checkName = (nome, value) => {
    if (nome.toLowerCase().indexOf(value) > -1) {
        return true;
    }

    return false;
}

function transform() {

    var fs = require('fs');
    var listaAlimentos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', "data", "lista.alimentos.json"), 'utf8'));

    var listaAlimentosUnidades = [];

    //Cria a lista de unidades
    for (var i = 0; i < listaAlimentos.length; i++) {

        var alimentoUnidade = null;
        var alimento = listaAlimentos[i];

        if (checkName(alimento.nome, "ovo") &&
            checkName(alimento.nome, "galinha")) {
            alimentoUnidade = {
                "idAlimento": alimento.id,
                "label": "Unidade(s)",
                "rating": 35
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
                "rating": 30
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

        if (alimentoUnidade !== null) {
            listaAlimentosUnidades.push(alimentoUnidade);
        }
    }


    fs.writeFileSync(path.join(__dirname, '..', "data", "lista.alimentos.unidades.js"), "var listaAlimentosUnidades = " + JSON.stringify(listaAlimentosUnidades) + "; ");

}

transform();
