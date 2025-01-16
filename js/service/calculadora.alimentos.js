//Calcular calorias dos alimentos
var listaIngredientes = new Array();
var outputListaAlimentos = document.querySelector('#outputListaAlimentos');
var outputHistoricoCalculos = document.querySelector('#outputHistoricoCalculos');

function txtPequisaAlterado(alimentoDigitadoValue) {

    if (alimentoDigitadoValue === "") {
        outputListaAlimentos.innerHTML = "";
    } else {
        var msg = "";

        //Contador para definir a ordem do delay corretamente
        var cont = 0;

        //Lista os produtos na tela com o botão calcular em cada um dos produtos
        for (var i = 0; i < listaAlimentos.length; i++) {

            var nome = listaAlimentos[i].nome;
            nome = removeCarecEspec(nome);

            if (nome.indexOf(alimentoDigitadoValue.toLowerCase()) > -1) {

                var peso = listaAlimentos[i].peso === undefined ? "100" : listaAlimentos[i].peso;
                var unidade = listaAlimentos[i].unidade === undefined ? "g" : listaAlimentos[i].unidade;

                msg += "<div class='listItem delay" + cont + "'>";
                msg += "<div class='title'>" + listaAlimentos[i].nome + "<div><span>" + listaAlimentos[i].calorias + "</span> cal por <span>" + peso + unidade + "</span></div></div> ";
                msg += "<div class='actions'>";
                msg += "<input type='number' id='itemResultadoPeso" + i + "' style='width: 85px;height: 40px;' placeholder='peso' oninput=\"calcularCaloriaProduto(this.value," + i + ", '" + listaAlimentos[i].id + "')\" />";
                msg += "<div class='action'><b>Calorias</b><div id='itemResultadoCalorias" + i + "'>-</div></div>";
                msg += "<div class='action'><b>Proteínas</b><div id='itemResultadoProteinas" + i + "'>-</div></div>";
                msg += "<button class='btn-selecionar' onclick=\"adicionarCalculo(" + i + ", '" + listaAlimentos[i].id + "')\"> Selecionar </button></div></div>";

                cont++;
            }
        }

        outputListaAlimentos.innerHTML = msg;
    }
}

var produtoCalculo = { "id": "" };

function buscarProdutoPorId(idProduto) {

    //Busca o produto na listaProdutos comparando a propriedade Id com o paramëtro "idProduto"
    for (var i = 0; i < listaAlimentos.length; i++) {
        var produto = listaAlimentos[i];

        if (produto.id === idProduto) {
            return produto;
        }
    }

    return null;
}

//Função chamada a cada input do peso
function calcularCaloriaProduto(peso, idxResultado, idProduto) {

    var itemResultadoCalorias = document.getElementById("itemResultadoCalorias" + idxResultado);
    var itemResultadoProteinas = document.getElementById("itemResultadoProteinas" + idxResultado);

    //Busca o produto em memória apenas quando o id for diferente do anterior
    if (produtoCalculo.id !== idProduto) {
        produtoCalculo = buscarProdutoPorId(idProduto)
    };

    if (peso !== "" && peso !== null && !isNaN(peso) && peso > 0) {
        peso = parseFloat(peso);

        //100g é o fator base
        var proteinas = Math.round((peso * produtoCalculo.proteina) / 100);
        var calorias = Math.round((peso * produtoCalculo.calorias) / 100);

        itemResultadoCalorias.innerHTML = calorias;
        itemResultadoProteinas.innerHTML = proteinas;
    } else {
        itemResultadoCalorias.innerHTML = "-";
        itemResultadoProteinas.innerHTML = "-";
    }
}

function adicionarCalculo(idxResultado, idProduto) {

    try {
        var pesoValue = parseFloat(document.getElementById("itemResultadoPeso" + idxResultado).value);

        if (isNaN(pesoValue)) {
            throw new Error("Informe o peso do ingrediente.");
        }

        if (pesoValue <= 0) {
            throw new Error("Peso deve ser maior que zero.");
        }

        var produto = buscarProdutoPorId(idProduto);

        var caloriasValue = parseFloat(document.getElementById("itemResultadoCalorias" + idxResultado).innerText);
        var proteinasValue = parseFloat(document.getElementById("itemResultadoProteinas" + idxResultado).innerText);

        listaIngredientes.push({
            "nome": produto.nome,
            "calorias": caloriasValue,
            "proteinas": proteinasValue,
            "peso": pesoValue,
            "unidade": produto.unidade
        });

        listaHistoricoCalculos();

        document.getElementById("txtPesquisa").value = "";
        outputListaAlimentos.innerHTML = "";
    }
    catch (e) {
        showWarning(e.message);
    }
}

function removerCalculo(idx) {
    listaIngredientes.splice(idx, 1);
    listaHistoricoCalculos();
}

function reiniciarListaIngredientes() {
    listaIngredientes = [];
    outputHistoricoCalculos.innerHTML = "";
}

function listaHistoricoCalculos() {

    if (listaIngredientes.length === 0) {
        outputHistoricoCalculos.innerHTML = "";
    } else {
        var strOutput = "<div class='list selecionados'>";
        strOutput += "<div class='title'>Ingredientes selecionados</div>";

        var totalCalorias = 0;
        var totalProteinas = 0;
        var totalPeso = 0;

        for (var i = 0; i < listaIngredientes.length; i++) {
            var itemCalculo = listaIngredientes[i];

            //Caso o item náo tenha a unidade preenchida
            var unidade = listaIngredientes[i].unidade === undefined ? "g" : listaIngredientes[i].unidade;

            strOutput += "<div class='item delay" + i + "'><b>" + itemCalculo.nome + "</b> " + itemCalculo.calorias + " calorias e ";
            strOutput += itemCalculo.proteinas + " proteínas em " + itemCalculo.peso + unidade;
            strOutput += "<button class='btn-remove' onclick='removerCalculo(" + i + ")'>x</button>";
            strOutput += "</div>";

            totalCalorias += itemCalculo.calorias;
            totalProteinas += itemCalculo.proteinas;
            totalPeso += itemCalculo.peso;
        }

        strOutput += "<div class='cols total'>";
        strOutput += "  <div>Calorias <span class='text'>" + totalCalorias;
        strOutput += "  </span></div>";
        strOutput += "  <div>Proteínas <span class='text'>" + totalProteinas;
        strOutput += "  </span></div>";
        strOutput += "  <div>Peso <span class='text'>" + totalPeso;
        strOutput += "  </span></div>";

        strOutput += "</div>";

        strOutput += "<div class='cols bar-add-ingredientes'>";
        strOutput += "  <div class='options'>";
        strOutput += "      <label><input type=\"radio\" name=\"inputTipoCardapio\" value=\"CA\" /> Café da manhã/tarde </label>";
        strOutput += "      <label><input type=\"radio\" name=\"inputTipoCardapio\" value=\"AJ\" /> Almoço/Jantar </label>";
        strOutput += "      <label><input type=\"radio\" name=\"inputTipoCardapio\" value=\"LC\" /> Lanches </label>";
        strOutput += "      <label><input type=\"radio\" name=\"inputTipoCardapio\" value=\"SM\" /> Sobremesas </label>";
        strOutput += "  </div>";

        strOutput += "  <div><button class='btn-main' onclick=\"adicionarItemCardapio()\"> Adicionar ao cardápio </button></div>";
        strOutput += "</div>";

        strOutput += "</div>";

        outputHistoricoCalculos.innerHTML = strOutput;
    }
}