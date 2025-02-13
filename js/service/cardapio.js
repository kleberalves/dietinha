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

            strOutputList += "<div class='item mini'><span>" + peso + unidade + "</span> de " + cardapio[i].itens[t].nome;
            strOutputList += "</div>";
        }
        strOutputList += "</div>";

        var strOutput = "<div class='listItem cardapio delay" + contDelay + "'>";
        strOutput += "  <div class='title'>" + cardapio[i].nome + "<div> Total de <span>" + cardapio[i].peso + "</span>g, ";
        strOutput += "<span>" + cardapio[i].calorias + "</span> de calorias e <span>" + cardapio[i].proteinas + "</span> de proteínas</div></div> ";
        strOutput += strOutputList;
        strOutput += "<div class='actions right'>";
        strOutput += "   <div class=\"btn-trash\" onclick=\"removerItemCardapio('" + cardapio[i].id + "')\"></div>";
        strOutput += "</div>";
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
