//Calcular calorias dos alimentos
var listaAlimentos = new Array();
var listaIngredientes = new Array();
var outputListaAlimentos = document.querySelector('#outputListaAlimentos');
var outputHistoricoCalculos = document.querySelector('#outputHistoricoCalculos');

function txtPequisaAlterado(alimentoDigitadoValue) {

    if (alimentoDigitadoValue === "") {
        outputListaAlimentos.innerHTML = "";
    } else {
        var msg = "";

        //Lista os produtos na tela com o botão calcular em cada um dos produtos
        for (var i = 0; i < listaAlimentos.length; i++) {
            if (listaAlimentos[i].nome.toLowerCase().indexOf(alimentoDigitadoValue.toLowerCase()) > -1) {
                msg += "<div class='listItem delay" + i + "'>";
                msg += "<div class='title'>" + listaAlimentos[i].nome + "<span>" + listaAlimentos[i].calorias + "cal por " + listaAlimentos[i].peso + listaAlimentos[i].unidade + "</span></div> ";
                msg += "<div class='actions'>";
                msg += "<input type='number' id='itemResultadoPeso" + i + "' style='width: 85px;height: 40px;' placeholder='peso' oninput='calcularCaloriaProduto(this.value, " + i + ", " + listaAlimentos[i].id + ")' />";
                msg += "<div class='action'><b>Calorias</b><div id='itemResultadoCalorias" + i + "'>-</div></div>";
                msg += "<div class='action'><b>Proteínas</b><div id='itemResultadoProteinas" + i + "'>-</div></div>";
                msg += "<button onclick=\"adicionarCalculo(" + i + ", " + listaAlimentos[i].id + ")\"> Adicionar </button></div></div>";
            }
        }

        outputListaAlimentos.innerHTML = msg;
    }
}


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

function calcularCaloriaProduto(peso, idxResultado, idProduto) {

    var itemResultadoCalorias = document.getElementById("itemResultadoCalorias" + idxResultado);
    var itemResultadoProteinas = document.getElementById("itemResultadoProteinas" + idxResultado);

    var produto = buscarProdutoPorId(idProduto);

    if (peso !== "" && peso !== null && !isNaN(peso) && peso > 0) {
        peso = parseFloat(peso);

        var proteinas = Math.round((peso * produto.proteina) / produto.peso);
        var calorias = Math.round((peso * produto.calorias) / produto.peso);

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

        if (pesoValue <= 0 || isNaN(pesoValue)) {
            throw new Error("Peso deve ser maior que zero");
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
        var strOutput = "<div class='list'>";
        strOutput += "<div class='title'>Ingredientes</div>";

        var totalCalorias = 0;
        var totalProteinas = 0;

        for (var i = 0; i < listaIngredientes.length; i++) {
            var itemCalculo = listaIngredientes[i];

            strOutput += "<div class='item delay" + i + "'><b>" + itemCalculo.nome + "</b> " + itemCalculo.calorias + " calorias e ";
            strOutput += itemCalculo.proteinas + " proteínas em " + itemCalculo.peso + itemCalculo.unidade;
            strOutput += "<button class='btn-remove' onclick='removerCalculo(" + i + ")'>x</button>";
            strOutput += "</div>";

            totalCalorias += itemCalculo.calorias;
            totalProteinas += itemCalculo.proteinas;
        }

        strOutput += "<div class='cols'>";
        strOutput += "  <div><b> Total de calorias</b> <span class=''>" + totalCalorias;
        strOutput += "  </span></div>";
        strOutput += "  <div><b> Total de proteínas</b> <span class=''>" + totalProteinas;
        strOutput += "  </span></div>";
        strOutput += "</div>";

        strOutput += "<div class='cols bar-add-ingredientes'>";
        strOutput += "  <div class='options'>";
        strOutput += "      <div><input type=\"radio\" name=\"inputTipoCardapio\" value=\"CM\" /> Café da manhã </div>";
        strOutput += "      <div><input type=\"radio\" name=\"inputTipoCardapio\" value=\"AL\" /> Almoço </div>";
        strOutput += "      <div><input type=\"radio\" name=\"inputTipoCardapio\" value=\"CT\" /> Café/lanche da tarde </div>";
        strOutput += "      <div><input type=\"radio\" name=\"inputTipoCardapio\" value=\"JA\" /> Jantar </div>";
        strOutput += "  </div>";

        strOutput += "  <div><button onclick=\"adicionarItemCardapio()\"> Adicionar ao cardápio </button></div>";
        strOutput += "</div>";

        strOutput += "</div>";

        outputHistoricoCalculos.innerHTML = strOutput;
    }
}
listaAlimentos.push({
    "id": 1,
    "nome": "Queijo muçarela",
    "calorias": 320,
    "peso": 100,
    "unidade": "g",
    "proteina": 23.8
});

listaAlimentos.push({
    "id": 2,
    "nome": "Arroz cozido",
    "calorias": 129,
    "peso": 100,
    "unidade": "g",
    "proteina": 2.5
});

listaAlimentos.push({
    "id": 3,
    "nome": "Feijão cozido",
    "calorias": 132,
    "peso": 100,
    "unidade": "g",
    "proteina": 8
});

listaAlimentos.push({
    "id": 4,
    "nome": "Pão francês",
    "calorias": 280,
    "peso": 100,
    "unidade": "g",
    "proteina": 0
});

listaAlimentos.push({
    "id": 5,
    "nome": "Batata Inglesa",
    "calorias": 52,
    "peso": 100,
    "unidade": "g",
    "proteina": 0
});

listaAlimentos.push({
    "id": 6,
    "nome": "Banana prata",
    "calorias": 89,
    "peso": 100,
    "unidade": "g",
    "proteina": 1.3
});

listaAlimentos.push({
    "id": 7,
    "nome": "Mortadela",
    "calorias": 311,
    "peso": 100,
    "unidade": "g",
    "proteina": 16
});

listaAlimentos.push({
    "id": 8,
    "nome": "Peito de frango",
    "calorias": 146,
    "peso": 100,
    "unidade": "g",
    "proteina": 29
});

listaAlimentos.push({
    "id": 9,
    "nome": "Pernil",
    "calorias": 340,
    "peso": 100,
    "unidade": "g",
    "proteina": 33
});

listaAlimentos.push({
    "id": 10,
    "nome": "Sobre-Coxa de frango",
    "calorias": 162,
    "peso": 100,
    "unidade": "g",
    "proteina": 18
});

listaAlimentos.push({
    "id": 11,
    "nome": "Beterraba cozida",
    "calorias": 32,
    "peso": 100,
    "unidade": "g",
    "proteina": 1.3
});

listaAlimentos.push({
    "id": 12,
    "nome": "Cenoura cozida",
    "calorias": 17,
    "peso": 100,
    "unidade": "g",
    "proteina": 0
});

listaAlimentos.push({
    "id": 13,
    "nome": "Ovo cozido",
    "calorias": 155,
    "peso": 100,
    "unidade": "g",
    "proteina": 13,
    "gordura": 11
});

listaAlimentos.push({
    "id": 14,
    "nome": "Farinha de aveia",
    "calorias": 385,
    "peso": 100,
    "unidade": "g",
    "proteina": 15,
    "gordura": 7.2
});

listaAlimentos.push({
    "id": 15,
    "nome": "Morango",
    "calorias": 33,
    "peso": 100,
    "unidade": "g",
    "proteina": 0.7,
    "gordura": 7.2
});

listaAlimentos.push({
    "id": 16,
    "nome": "Queijo minas frescal",
    "calorias": 243,
    "peso": 100,
    "unidade": "g",
    "proteina": 15.9,
    "gordura": 0
});

listaAlimentos.push({
    "id": 17,
    "nome": "Queijo gorgonzola",
    "calorias": 324,
    "peso": 100,
    "unidade": "g",
    "proteina": 19.1,
    "gordura": 0
});

listaAlimentos.push({
    "id": 18,
    "nome": "Queijo muçarela de búfula",
    "calorias": 311,
    "peso": 100,
    "unidade": "g",
    "proteina": 21.4,
    "gordura": 0
});

listaAlimentos.push({
    "id": 19,
    "nome": "Queijo parmesão",
    "calorias": 448,
    "peso": 100,
    "unidade": "g",
    "proteina": 31.9,
    "gordura": 0
});

listaAlimentos.push({
    "id": 20,
    "nome": "Queijo prato",
    "calorias": 346,
    "peso": 100,
    "unidade": "g",
    "proteina": 24.2,
    "gordura": 0
});

listaAlimentos.push({
    "id": 21,
    "nome": "Queijo provolone",
    "calorias": 350,
    "peso": 100,
    "unidade": "g",
    "proteina": 25.6,
    "gordura": 0
});

listaAlimentos.push({
    "id": 22,
    "nome": "Queijo ricota",
    "calorias": 139,
    "peso": 100,
    "unidade": "g",
    "proteina": 25.6,
    "gordura": 0
});

listaAlimentos.push({
    "id": 23,
    "nome": "Paleta carne",
    "calorias": 155,
    "peso": 100,
    "unidade": "g",
    "proteina": 21,
    "gordura": 0
});
