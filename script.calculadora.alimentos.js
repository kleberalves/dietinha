//Calcular calorias dos alimentos
var listaAlimentos = new Array();
var listaHistorico = new Array();
var outputListaAlimentos = document.querySelector('#outputListaAlimentos');
var outputHistoricoCalculos = document.querySelector('#outputHistoricoCalculos');

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

function calcularCaloriaProduto(idProduto) {

    var produto = buscarProdutoPorId(idProduto);

    var peso = prompt('Insira o peso:');
    peso = parseFloat(peso);

    var proteinas = Math.round((peso * produto.proteina) / produto.peso);
    var calorias = Math.round((peso * produto.calorias) / produto.peso);

    var msgResultado = produto.nome + ": " + calorias + " calorias e ";
    msgResultado += proteinas + " proteínas por " + peso + produto.unidade;
    msgResultado += " <br/><button class='btnCafeManha' onclick='addDieta(1, " + idProduto + "," + proteinas + "," + calorias + "," + peso + ")'> Adicionar café da manhã </button>"
    msgResultado += " <button class='btnAlmoco' onclick='addDieta(2, " + idProduto + "," + proteinas + "," + calorias + "," + peso + ")'> Adicionar almoço </button>"
    msgResultado += " <button class='btnCafeLancheTarde' onclick='addDieta(3, " + idProduto + "," + proteinas + "," + calorias + "," + peso + ")'> Adicionar café/lanche da tarde </button>"
    msgResultado += " <button class='btnJantar' onclick='addDieta(4, " + idProduto + "," + proteinas + "," + calorias + "," + peso + ")'> Adicionar jantar </button>"
    msgResultado += "<hr/>";

    listaHistorico.push(msgResultado);

    var msgHistorico = "<h4>Histórico</h4>";

    for (var i = 0; i < listaHistorico.length; i++) {
        msgHistorico += listaHistorico[i];
    }

    outputHistoricoCalculos.innerHTML = msgHistorico;
}

function addDieta(numOperacao, idProduto, qtdProteinas, qtdCalorias, peso) {
    alert(numOperacao + " " + idProduto);
}

function exibeAlimentos() {

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
        "unidade": "g"
    });

    listaAlimentos.push({
        "id": 5,
        "nome": "Batata Inglesa",
        "calorias": 52,
        "peso": 100,
        "unidade": "g"
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

    var msg = "<h4 style='margin-bottom:0px'>Alimentos</h4> ";

    //Lista os produtos na tela com o botão calcular em cada um dos produtos
    for (var i = 0; i < listaAlimentos.length; i++) {
        var produto = listaAlimentos[i];
        msg += "<h4 style='margin-bottom:0px; margin-top:10px'>" + listaAlimentos[i].nome + "</h4> " + listaAlimentos[i].calorias + "cal por " + listaAlimentos[i].peso + listaAlimentos[i].unidade + " <button onclick=\"calcularCaloriaProduto(" + listaAlimentos[i].id + ")\"> Calcular </button>";
    }

    outputListaAlimentos.innerHTML = msg;
}

