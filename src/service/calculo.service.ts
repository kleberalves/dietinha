import { INGREDIENTES_STORE } from "../app";
import { showWarning } from "./message.service";
import { store } from "./store.service";

declare var listaAlimentos: Alimento[];

let produtoCalculo: Alimento | undefined;

export const buscarProdutoPorId = (idProduto: number) => {

    //Busca o produto na listaProdutos comparando a propriedade Id com o paramëtro "idProduto"
    for (var i = 0; i < listaAlimentos.length; i++) {
        var produto = listaAlimentos[i];

        if (produto.id === idProduto) {
            return produto;
        }
    }

    return undefined;
}

export const calcularAlimento = (peso: string, idxResultado: number, idProduto: number): void => {

    if (produtoCalculo === undefined || produtoCalculo.id !== idProduto) {
        produtoCalculo = buscarProdutoPorId(idProduto);
    }

    var itemResultadoCalorias = document.getElementById("itemResultadoCalorias" + idxResultado);
    var itemResultadoProteinas = document.getElementById("itemResultadoProteinas" + idxResultado);

    if (peso !== "" &&
        peso !== null &&
        !isNaN(parseFloat(peso)) &&
        parseFloat(peso) > 0 &&
        produtoCalculo !== undefined
    ) {
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

export const adicionarCalculo = (idxResultado: number, idProduto: number) => {

    try {
        var elementPeso: HTMLInputElement = document.getElementById("itemResultadoPeso" + idxResultado) as HTMLInputElement;
        var pesoValue = parseFloat(elementPeso === null ? "" : elementPeso.value);

        if (isNaN(pesoValue)) {
            throw new Error("Informe o peso do ingrediente.");
        }

        if (pesoValue <= 0) {
            throw new Error("Peso deve ser maior que zero.");
        }

        var produto = buscarProdutoPorId(idProduto);

        var elementCaloria: HTMLDivElement = document.getElementById("itemResultadoCalorias" + idxResultado) as HTMLDivElement;
        var elementProteina: HTMLDivElement = document.getElementById("itemResultadoProteinas" + idxResultado) as HTMLDivElement;

        var caloriasValue = parseFloat(elementCaloria.innerText);
        var proteinasValue = parseFloat(elementProteina.innerText);

        if (produto !== undefined) {

            store.addItem(INGREDIENTES_STORE, {
                "nome": produto.nome,
                "calorias": caloriasValue,
                "proteinas": proteinasValue,
                "peso": pesoValue,
                "unidade": produto.unidade
            });
        }

    }
    catch (e) {
        showWarning(e.message);
    }
}