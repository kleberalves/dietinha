import { getRadiosCheck } from "../lib/forms";
import { showWarning } from "../lib/message.lib";
import { swapScreen } from "../lib/screens.lib";
import { localISOString } from "../lib/treatments";
import { screens, stores } from "./config.service";
import { store } from "./store.service";
import { sync } from "./sync.service";

import { Hole, html } from "uhtml";

export const removerIngrediente = (id?: string) => {

    if (id)
        store.removeItemById(stores.Ingrediente, id);

}

export const removerIngredienteAssistente = (id?: string) => {

    if (id)
        store.removeItemById(stores.IngredienteAssistente, id);

}

export const somaMacros = (listaIngredientes: Ingrediente[], componentMode: string) => {
    let items: Hole[] = [];

    var totalCalorias = 0;
    var totalProteinas = 0;
    var totalPeso = 0;

    for (var i = 0; i < listaIngredientes.length; i++) {
        var itemCalculo = listaIngredientes[i];

        items.push(html`<app-ingredientes-selecionados-item mode=${componentMode} class=${componentMode}
                            ingrediente=${JSON.stringify(listaIngredientes[i])} />`);

        totalCalorias += itemCalculo.calorias;
        totalProteinas += itemCalculo.proteinas;
        totalPeso += itemCalculo.peso;
    }
    return { items, totalCalorias, totalProteinas, totalPeso };
}

export const removerIngredienteCardapioItem = (cardapioItem: CardapioItem, ingredienteId: string) => {

    if (cardapioItem)
        for (let i = 0; i < cardapioItem.ingredientes.length; i++) {
            if (cardapioItem.ingredientes[i].id === ingredienteId) {
                cardapioItem.ingredientes[i].deleted = localISOString();
                break;
            }
        }

}

export const salvarItemCardapio = (listaIngredientes: Ingrediente[], cardapioItemEdit: CardapioItem | null) => {
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

            var itemCardapio: CardapioItem = {
                "nome": nomeItemCardapio,
                "tipo": tipoItemCardapio,
                "calorias": totalCalorias,
                "proteinas": totalProteinas,
                "peso": totalPeso,
                "ingredientes": listaIngredientes
            }

            //Se estiver em EDIT MODE, atualiza o ID
            if (cardapioItemEdit !== null) {
                itemCardapio.id = cardapioItemEdit.id;
                itemCardapio.created = cardapioItemEdit.created;

                for (let i = 0; i < cardapioItemEdit.ingredientes.length; i++) {

                    let ingrediente = cardapioItemEdit.ingredientes[i];
                    let itemFound = itemCardapio.ingredientes.filter((i) => {
                        return i.id === ingrediente.id
                    });

                    if (itemFound.length === 0) {
                        itemCardapio.ingredientes.push(ingrediente);
                    }

                }
            }

            store.updateCreate<CardapioItem>(stores.Cardapio, itemCardapio);
            store.editFinish();

            sync();

            swapScreen(screens.Cardapio);
        }
    } catch (e) {
        showWarning(e.message);
    }
}