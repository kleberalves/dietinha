function adicionarItemCardapio() {
    try {
        if (listaIngredientes.length > 0) {

            var nomeItemCardapio = "";
            var tipoItemCardapio = getRadiosCheck("inputTipoCardapio");

            if (tipoItemCardapio === null) {
                throw new Error("Selecione o tipo.")
            }
            var totalCalorias = 0;
            var totalProteinas = 0;

            for (var i = 0; i < listaIngredientes.length; i++) {
                var itemCalculo = listaIngredientes[i];

                if (i === 0) {
                    nomeItemCardapio += itemCalculo.nome;
                } else {
                    nomeItemCardapio += ", " + itemCalculo.nome;
                }

                totalCalorias += itemCalculo.calorias;
                totalProteinas += itemCalculo.proteinas;
            }

            var itemCardapio = {
                "id": uuidv4(),
                "nome": nomeItemCardapio,
                "tipo": tipoItemCardapio,
                "calorias": totalCalorias,
                "proteinas": totalProteinas,
                "itens": listaIngredientes,
                "created": new Date()
            }

            var cardapio = salvarItemCardapio(itemCardapio);
            showCardapio(cardapio);

            reiniciarListaIngredientes();
        }
    } catch (e) {
        showWarning(e.message);
    }
}

function showCardapio(cardapio) {

    if (cardapio === undefined) {
        cardapio = loadCardapio();
    }

    if (cardapio === undefined) {
        return;
    }

    var outputListaCardapio = document.querySelector('#outputListaCardapio');

    var strCafeManha = "<h4>Café da manhã</h4>";
    var strAlmoco = "<h4>Almoço</h4>";
    var strCafeTarde = "<h4>Café/Lanche da tarde</h4>";
    var strJantar = "<h4>Jantar</h4>";

    for (var i = 0; i < cardapio.length; i++) {

        var strOutputList = "<div class='list mini'>";
        for (var t = 0; t < cardapio[i].itens.length; t++) {
            strOutputList += "<div class='item mini'><b>" + cardapio[i].itens[t].nome + "</b> " + cardapio[i].itens[t].peso + cardapio[i].itens[t].unidade;
            strOutputList += "</div>";
        }
        strOutputList += "</div>";


        var strOutput = "<div class='listItem delay" + i + "'>";
        strOutput += "  <div class='title'>" + cardapio[i].nome + "<span>" + cardapio[i].calorias + " de calorias e " + cardapio[i].proteinas + " de proteínas</span></div> ";
        strOutput += strOutputList;
        strOutput += "  <button class=\"btn-remove\" onclick=\"removerItemCardapio('" + cardapio[i].id + "')\">x</button>";
        strOutput += "</div>";

        if (cardapio[i].tipo === "CM") {
            strCafeManha += strOutput;
        }

        if (cardapio[i].tipo === "AL") {
            strAlmoco += strOutput;
        }

        if (cardapio[i].tipo === "CT") {
            strCafeTarde += strOutput;
        }

        if (cardapio[i].tipo === "JA") {
            strJantar += strOutput;
        }

    }

    outputListaCardapio.innerHTML = strCafeManha + strAlmoco + strCafeTarde + strJantar;
}

function removerItemCardapio(id) {

    if (window.confirm("Você tem certeza que deseja remover este item do seu cardário?")) {

        var cardapio = loadCardapio();

        for (var i = 0; i < cardapio.length; i++) {
            if (cardapio[i].id === id) {
                cardapio.splice(i, 1);
                break;
            }
        }

        salvarCardapio(cardapio);
        showCardapio(cardapio);
    }
}

/* Salva e retorna a lista completa */
function salvarItemCardapio(item) {

    var cardapio = loadCardapio();

    if (cardapio === null) {
        cardapio = [];
    }

    cardapio.push(item);

    salvarCardapio(cardapio);

    return cardapio;

}

function salvarCardapio(cardapio) {
    saveDataLocal(cardapio, "cardapio");
}

function loadCardapio() {
    return loadDataLocal("cardapio");
}