//Calcular calorias dos alimentos
var listaAlimentos = new Array();
var listaCalculos = new Array();
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
                msg += "<div class='rowList'>";
                msg += "<div class='title'>" + listaAlimentos[i].nome + "<span>" + listaAlimentos[i].calorias + "cal por " + listaAlimentos[i].peso + listaAlimentos[i].unidade + "</span></div> ";
                msg += "<div class='actions'>";
                msg += "<input type='number' id='itemResultadoPeso" + i + "' style='width: 70px;' placeholder='peso' oninput='calcularCaloriaProduto(this.value, " + i + ", " + listaAlimentos[i].id + ")' />";
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

    if (peso !== "" && peso !== null && !isNaN(peso)) {
        peso = parseFloat(peso);

        var proteinas = Math.round((peso * produto.proteina) / produto.peso);
        var calorias = Math.round((peso * produto.calorias) / produto.peso);

        itemResultadoCalorias.innerHTML = calorias;
        itemResultadoProteinas.innerHTML = proteinas;
    } else {
        itemResultadoCalorias.innerHTML = Math.round((peso * produto.calorias) / produto.peso);
        itemResultadoProteinas.innerHTML = Math.round((peso * produto.proteina) / produto.peso);
    }
}

function adicionarCalculo(idxResultado, idProduto) {

    var produto = buscarProdutoPorId(idProduto);

    var itemResultadoCaloriasValue = parseFloat(document.getElementById("itemResultadoCalorias" + idxResultado).innerText);
    var itemResultadoProteinasValue = parseFloat(document.getElementById("itemResultadoProteinas" + idxResultado).innerText);
    var itemResultadoPesoValue = parseFloat(document.getElementById("itemResultadoPeso" + idxResultado).value);

    listaCalculos.push({
        "nome": produto.nome,
        "calorias": itemResultadoCaloriasValue,
        "proteinas": itemResultadoProteinasValue,
        "peso": itemResultadoPesoValue,
        "unidade": produto.unidade
    });


    listaHistoricoCalculos();


    document.getElementById("txtPesquisa").value = "";
    outputListaAlimentos.innerHTML = "";
}

function listaHistoricoCalculos() {
    var msgHistorico = "<b>Cálculos</b>";
    var totalCalorias = 0;
    var totalProteinas = 0;

    for (var i = 0; i < listaCalculos.length; i++) {
        var itemCalculo = listaCalculos[i];

        msgHistorico += "<hr/><b>" + itemCalculo.nome + "</b> " + itemCalculo.calorias + " calorias e ";
        msgHistorico += itemCalculo.proteinas + " proteínas em " + itemCalculo.peso + itemCalculo.unidade;

        totalCalorias += itemCalculo.calorias;
        totalProteinas += itemCalculo.proteinas;
    }

    msgHistorico += "<br/><br/><b> Total Calorias</b> " + totalCalorias;
    msgHistorico += "<br/><b> Total Proteínas</b> " + totalProteinas;

    outputHistoricoCalculos.innerHTML = msgHistorico;
}

listaAlimentos.push({
    "id": 1,
    "nome": "Queijo Muçarela",
    "calorias": 127,
    "peso": 40,
    "unidade": "g",
    "proteina": 9.2
});

listaAlimentos.push({
    "id": 2,
    "nome": "Arroz Cozido",
    "calorias": 129,
    "peso": 100,
    "unidade": "g",
    "proteina": 2.5
});

listaAlimentos.push({
    "id": 3,
    "nome": "Feijão Cozido",
    "calorias": 132,
    "peso": 100,
    "unidade": "g",
    "proteina": 8
});

listaAlimentos.push({
    "id": 4,
    "nome": "Pão Francês",
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
    "nome": "Banana Prata",
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
    "nome": "Peito de Frango",
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
    "nome": "Sobre-Coxa",
    "calorias": 162,
    "peso": 100,
    "unidade": "g",
    "proteina": 18
});

listaAlimentos.push({
    "id": 11,
    "nome": "Beterraba Cozida",
    "calorias": 32,
    "peso": 100,
    "unidade": "g",
    "proteina": 1.3
});

listaAlimentos.push({
    "id": 12,
    "nome": "Cenoura Cozida",
    "calorias": 17,
    "peso": 100,
    "unidade": "g",
    "proteina": 0
});