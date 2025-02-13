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

                msg += `<app-pesquisa-item 
                            nome="${listaAlimentos[i].nome}"
                            id="${listaAlimentos[i].id}"
                            idx="${i}"
                            peso="${peso}"
                            unidade="${unidade}"
                            cont="${cont}"
                            > </app-pesquisa-item>`;
                cont++;
            }
        }

        outputListaAlimentos.innerHTML = msg;
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