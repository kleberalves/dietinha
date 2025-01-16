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
            var totalPeso = 0;

            for (var i = 0; i < listaIngredientes.length; i++) {
                var itemCalculo = listaIngredientes[i];

                if (i === 0) {
                    nomeItemCardapio += itemCalculo.nome;
                } else if (i === listaIngredientes.length - 1) {
                    nomeItemCardapio += " e " + itemCalculo.nome.toLowerCase();
                } else {
                    nomeItemCardapio += ", " + itemCalculo.nome.toLowerCase();
                }

                totalCalorias += itemCalculo.calorias;
                totalProteinas += itemCalculo.proteinas;
                totalPeso += itemCalculo.peso;
            }

            var itemCardapio = {
                "id": uuidv4(),
                "nome": nomeItemCardapio,
                "tipo": tipoItemCardapio,
                "calorias": totalCalorias,
                "proteinas": totalProteinas,
                "peso": totalPeso,
                "itens": listaIngredientes,
                "created": new Date()
            }

            var cardapio = salvarItemCardapio(itemCardapio);
            showCardapio(cardapio);
            reiniciarListaIngredientes();

            closeForm("tabHomeCalculadora");
            openForm("tabHomeCardapio");
        }
    } catch (e) {
        showWarning(e.message);
    }
}

function showCardapio(cardapio) {

    if (isNullOrEmpty(cardapio)) {
        cardapio = loadCardapio();
    }

    if (isNullOrEmpty(cardapio)) {
        //Vazio para mostrar os labels
        cardapio = [];
    }

    var outputListaCardapio = document.querySelector('#outputListaCardapio');

    var strCafes = "<h4>Café da manhã/tarde</h4>";
    var strAlmocoJantar = "<h4>Almoço/jantar</h4>";
    var strLanches = "<h4>Lanches</h4>";
    var strSobremesas = "<h4>Sobremesas</h4>";

    var contDelay = 0;

    for (var i = 0; i < cardapio.length; i++) {

        var strOutputList = "<div class='list mini'>";
        for (var t = 0; t < cardapio[i].itens.length; t++) {

            var peso = cardapio[i].itens[t].peso === undefined ? "100" : cardapio[i].itens[t].peso;
            var unidade = cardapio[i].itens[t].unidade === undefined ? "g" : cardapio[i].itens[t].unidade;

            strOutputList += "<div class='item mini'>" + cardapio[i].itens[t].nome + "<span>" + peso + unidade;
            strOutputList += "</span></div>";
        }
        strOutputList += "</div>";

        var strOutput = "<div class='listItem cardapio delay" + contDelay + "'>";
        strOutput += "  <div class='title'>" + cardapio[i].nome + "<div><span>" + cardapio[i].peso + "</span> gramas, ";
        strOutput += "<span>" + cardapio[i].calorias + "</span> de calorias e <span>" + cardapio[i].proteinas + "</span> de proteínas</div></div> ";
        strOutput += strOutputList;
        strOutput += "  <button class=\"btn-remove\" onclick=\"removerItemCardapio('" + cardapio[i].id + "')\">x</button>";
        strOutput += "</div>";

        switch (cardapio[i].tipo) {
            case "CA":
                strCafes += strOutput;
                break;
            case "AJ":
                strAlmocoJantar += strOutput;
                break;
            case "LC":
                strLanches += strOutput;
                break;
            case "SM":
                strSobremesas += strOutput;
                break;
        }

        contDelay++;
    }

    outputListaCardapio.innerHTML = strCafes + strAlmocoJantar + strLanches + strSobremesas;
}

function removerItemCardapio(id) {

    showConfirm("Você tem certeza que deseja remover este item do seu cardário?", () => {

        var cardapio = loadCardapio();

        for (var i = 0; i < cardapio.length; i++) {
            if (cardapio[i].id === id) {
                cardapio.splice(i, 1);
                break;
            }
        }

        salvarCardapio(cardapio);
        showCardapio(cardapio);
    })
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