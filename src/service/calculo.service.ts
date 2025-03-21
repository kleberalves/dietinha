import { stores } from "../service/config.service";
import { showWarning } from "../lib/message.lib";
import { store } from "./store.service";

declare var listaAlimentos: Alimento[];

let produtoCalculo: Alimento | undefined;

export const buscarProdutoPorId = (idProduto: string) => {

    //Busca o produto na listaProdutos comparando a propriedade Id com o paramëtro "idProduto"
    for (var i = 0; i < listaAlimentos.length; i++) {
        var produto = listaAlimentos[i];

        if (produto.id === idProduto) {
            return produto;
        }
    }

    return undefined;
}

export const calcularAlimentoColher = (unidade: string, idxResultado: number, idProduto: string, rating: number): void => {

    if (unidade !== "" &&
        unidade !== null &&
        !isNaN(parseFloat(unidade)) &&
        parseFloat(unidade) > 0) {

        let pesoNum = parseInt(unidade) * rating;

        var inputPeso = document.getElementById("inputPeso" + idxResultado) as HTMLInputElement;
        if (inputPeso) {
            inputPeso.value = pesoNum.toString();
        }

        calcularAlimento(pesoNum, idxResultado, idProduto)
    }
}

export const calcularAlimentoPeso = (peso: string, idxResultado: number, idProduto: string, rating: number): void => {

    if (peso !== "" &&
        peso !== null &&
        !isNaN(parseFloat(peso)) &&
        parseFloat(peso) > 0) {

        let pesoNum = parseInt(peso);

        var inputQuantidade = document.getElementById("inputQuantidade" + idxResultado) as HTMLInputElement;

        calcularAlimento(pesoNum, idxResultado, idProduto)

        if (inputQuantidade) {
            inputQuantidade.value = Math.round(pesoNum / rating).toString();
        }
    }
}

const calcularAlimento = (peso: number, idxResultado: number, idProduto: string): void => {

    if (produtoCalculo === undefined || produtoCalculo.id !== idProduto) {
        produtoCalculo = buscarProdutoPorId(idProduto);
    }

    var itemResultadoCalorias = document.getElementById("itemResultadoCalorias" + idxResultado);
    var itemResultadoProteinas = document.getElementById("itemResultadoProteinas" + idxResultado);

    if (produtoCalculo !== undefined) {

        //100g é o fator base
        var proteinas = Math.round((peso * produtoCalculo.proteina) / 100);
        var calorias = Math.round((peso * produtoCalculo.calorias) / 100);

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

declare var listaAlimentosUnidades: AlimentoUnidade[];

export const getUnidades = (id: string): UnidadeAlt => {
    let unidadeAlt: UnidadeAlt = {
        peso: 0,
        desc: ""
    };

    for (let i = 0; i < listaAlimentosUnidades.length; i++) {

        if (id === listaAlimentosUnidades[i].idAlimento) {
            unidadeAlt.peso = listaAlimentosUnidades[i].rating;
            unidadeAlt.desc = listaAlimentosUnidades[i].label;
            return unidadeAlt;
        }
    }

    return unidadeAlt;
}

export const adicionarIngredienteAssistente = (idProduto: string) => {

    try {
        let unidadeAlt: UnidadeAlt = getUnidades(idProduto);
        addIngredienteStorage(stores.IngredienteAssistente, idProduto, 0, 0, 0, unidadeAlt);
    }
    catch (e) {
        showWarning(e.message);
    }
}

export const adicionarCalculo = (idxResultado: number, idProduto: string, unidadeAlt: UnidadeAlt) => {

    try {
        var elementPeso: HTMLInputElement = document.getElementById("inputPeso" + idxResultado) as HTMLInputElement;
        var pesoValue = parseFloat(elementPeso === null ? "" : elementPeso.value);

        if (isNaN(pesoValue)) {
            throw new Error("Informe o peso do ingrediente.");
        }

        if (pesoValue <= 0) {
            throw new Error("Peso deve ser maior que zero.");
        }

        var elementCaloria: HTMLDivElement = document.getElementById("itemResultadoCalorias" + idxResultado) as HTMLDivElement;
        var elementProteina: HTMLDivElement = document.getElementById("itemResultadoProteinas" + idxResultado) as HTMLDivElement;
        var caloriasValue = parseFloat(elementCaloria.innerText);
        var proteinasValue = parseFloat(elementProteina.innerText);

        addIngredienteStorage(stores.Ingrediente, idProduto, caloriasValue, proteinasValue, pesoValue, unidadeAlt);
    }
    catch (e) {
        showWarning(e.message);
    }
}

function addIngredienteStorage(storeName:string, idProduto: string, caloriasValue: number, proteinasValue: number, pesoValue: number, unidadeAlt: UnidadeAlt) {
    var produto = buscarProdutoPorId(idProduto);

    if (produto !== undefined) {

        store.addItem<Ingrediente>(storeName, {
            "nome": produto.nome,
            "calorias": caloriasValue,
            "proteinas": proteinasValue,
            "idProduto": produto.id,
            "peso": pesoValue,
            "unidade": produto.unidade,
            "unidAltDesc": unidadeAlt.desc,
            "unidAltPeso": unidadeAlt.peso,
        } as Ingrediente);
    }
}
