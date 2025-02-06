declare var listaAlimentos: any;

var listaIngredientes = new Array();
var outputListaAlimentos: HTMLDivElement = document.querySelector('#outputListaAlimentos') as HTMLDivElement;
var outputHistoricoCalculos: HTMLDivElement = document.querySelector('#outputHistoricoCalculos') as HTMLDivElement;

export const buscarProdutoPorId = (idProduto) => {

    //Busca o produto na listaProdutos comparando a propriedade Id com o paramëtro "idProduto"
    for (var i = 0; i < listaAlimentos.length; i++) {
        var produto = listaAlimentos[i];

        if (produto.id === idProduto) {
            return produto;
        }
    }

    return null;
}

export const calcularCaloriaProduto = (dom: ShadowRoot, peso: string, idxResultado, idProduto): void => {

    var itemResultadoCalorias = dom.getElementById("itemResultadoCalorias" + idxResultado);
    var itemResultadoProteinas = dom.getElementById("itemResultadoProteinas" + idxResultado);

    //Busca o produto em memória apenas quando o id for diferente do anterior
    if (produtoCalculo.id !== idProduto) {
        produtoCalculo = buscarProdutoPorId(idProduto)
    };

    if (peso !== "" && peso !== null && !isNaN(parseFloat(peso)) && parseFloat(peso) > 0) {
        var pesoNum = parseFloat(peso);

        //100g é o fator base
        var proteinas = Math.round((pesoNum * produtoCalculo.proteina) / 100);
        var calorias = Math.round((pesoNum * produtoCalculo.calorias) / 100);

        if (itemResultadoCalorias !== null && itemResultadoProteinas !== null) {
            itemResultadoCalorias.innerHTML = calorias.toString();
            itemResultadoProteinas.innerHTML = proteinas.toString();
        }
    } else {
        if (itemResultadoCalorias !== null && itemResultadoProteinas !== null) {
            itemResultadoCalorias.innerHTML = "-";
            itemResultadoProteinas.innerHTML = "-";
        }
    }
}

export const adicionarCalculo = (dom:ShadowRoot, idxResultado:number, idProduto:number) => {

    try {
        var elementPeso: HTMLInputElement = dom.getElementById("itemResultadoPeso" + idxResultado) as HTMLInputElement;
        var pesoValue = parseFloat(elementPeso === null ? "" : elementPeso.value);

        if (isNaN(pesoValue)) {
            throw new Error("Informe o peso do ingrediente.");
        }

        if (pesoValue <= 0) {
            throw new Error("Peso deve ser maior que zero.");
        }

        var produto = buscarProdutoPorId(idProduto);

        var elementCaloria: HTMLDivElement = dom.getElementById("itemResultadoCalorias" + idxResultado) as HTMLDivElement;
        var elementProteina: HTMLDivElement = dom.getElementById("itemResultadoProteinas" + idxResultado) as HTMLDivElement;

        var caloriasValue = parseFloat(elementCaloria.innerText);
        var proteinasValue = parseFloat(elementProteina.innerText);

        listaIngredientes.push({
            "nome": produto.nome,
            "calorias": caloriasValue,
            "proteinas": proteinasValue,
            "peso": pesoValue,
            "unidade": produto.unidade
        });

        listaHistoricoCalculos();

        var ele: HTMLInputElement = document.getElementById("txtPesquisa") as HTMLInputElement;

        ele.value = "";
        outputListaAlimentos.innerHTML = "";
    }
    catch (e) {
        //showWarning(e.message);
    }
}

export function removerCalculo(idx) {
    listaIngredientes.splice(idx, 1);
    listaHistoricoCalculos();
}

export function reiniciarListaIngredientes() {
    listaIngredientes = [];
    outputHistoricoCalculos.innerHTML = "";
}

export function listaHistoricoCalculos() {

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