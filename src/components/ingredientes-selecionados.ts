import { Hole, html, render } from "uhtml";
import { Base } from "./Base";
import { store } from "../service/store.service";
import { CARDAPIO_STORE, INGREDIENTES_STORE } from "../app";
import { closeForm, openForm, getRadiosCheck } from "../lib/forms";
import { uuidv4 } from "../lib/uuidv4";
import { showWarning } from "../service/message.service";

class IngredientesSelecionados extends Base {

    props: {
        idx: number;
        id: number;
    }

    listaIngredientes: Ingrediente[] = [];

    constructor() {
        super();


        store.onAddedItem(INGREDIENTES_STORE, (e: CustomEventInit) => {

            this.listaIngredientes = e.detail.items;
            this.render();
        });

        store.onRemovedItem(INGREDIENTES_STORE, (e: CustomEventInit) => {

            if (e.detail.items.length === 0) {
                this.listaIngredientes = [];
                render(this, html``);
            } else {

                this.listaIngredientes = [];
                this.render();

                this.listaIngredientes = e.detail.items;
                this.render();
            }
        });

        store.onCleared(INGREDIENTES_STORE, (e: CustomEventInit) => {

            this.listaIngredientes = [];
            render(this, html``);
        });

    }

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id"),
        }

        this.listaIngredientes = store.getItems(INGREDIENTES_STORE);

        if (this.listaIngredientes.length > 0) {
            this.render();
        }
    }

    render() {
        var totalCalorias = 0;
        var totalProteinas = 0;
        var totalPeso = 0;

        let items: Hole[] = [];

        for (var i = 0; i < this.listaIngredientes.length; i++) {
            var itemCalculo = this.listaIngredientes[i];

            items.push(html`<app-ingredientes-selecionados-item 
                                ingrediente=${JSON.stringify(this.listaIngredientes[i])} />`);

            totalCalorias += itemCalculo.calorias;
            totalProteinas += itemCalculo.proteinas;
            totalPeso += itemCalculo.peso;
        }

        render(this, html`<div class='list selecionados'>
            <div class='title'>Ingredientes selecionados</div>
                    ${items.map(item => item)}
            <div class='cols total'>
                <div>Calorias <span class='text'> ${totalCalorias} </span></div>
                <div>Proteínas <span class='text'>${totalProteinas} </span></div>
                <div>Peso <span class='text'>${totalPeso} </span></div>
            </div>
                <div class='cols bar-add-ingredientes'>
                    <div class='options'>
                        <label><input type="radio" name="inputTipoCardapio" value="CA" /> Café da manhã/tarde </label>
                        <label><input type="radio" name="inputTipoCardapio" value="AJ" /> Almoço/Jantar </label>
                        <label><input type="radio" name="inputTipoCardapio" value="LC" /> Lanches </label>
                        <label><input type="radio" name="inputTipoCardapio" value="SM" /> Sobremesas </label>
                    </div>
                    <div><button class='btn-main' onclick=${() => this.adicionarItemCardapio()}> Adicionar ao cardápio </button></div>
                </div>
            </div>
      `);

    }

    adicionarItemCardapio() {
        try {
            if (this.listaIngredientes.length > 0) {

                var nomeItemCardapio = "";
                var tipoItemCardapio = getRadiosCheck("inputTipoCardapio");

                if (tipoItemCardapio === null) {
                    throw new Error("Selecione o tipo.")
                }
                var totalCalorias = 0;
                var totalProteinas = 0;
                var totalPeso = 0;

                for (var i = 0; i < this.listaIngredientes.length; i++) {
                    var itemCalculo = this.listaIngredientes[i];

                    if (i === 0) {
                        nomeItemCardapio += itemCalculo.nome;
                    } else if (i === this.listaIngredientes.length - 1) {
                        nomeItemCardapio += " e " + itemCalculo.nome.toLowerCase();
                    } else {
                        nomeItemCardapio += ", " + itemCalculo.nome.toLowerCase();
                    }

                    totalCalorias += itemCalculo.calorias;
                    totalProteinas += itemCalculo.proteinas;
                    totalPeso += itemCalculo.peso;
                }

                var itemCardapio = {
                    "id": uuidv4(),
                    "nome": nomeItemCardapio,
                    "tipo": tipoItemCardapio,
                    "calorias": totalCalorias,
                    "proteinas": totalProteinas,
                    "peso": totalPeso,
                    "itens": this.listaIngredientes,
                    "created": new Date()
                }

                store.addItem(CARDAPIO_STORE, itemCardapio);

                this.reiniciarListaIngredientes();

                closeForm("tabHomeCalculadora");
                openForm("tabHomeCardapio");
            }
        } catch (e) {
            showWarning(e.message);
        }
    }

    reiniciarListaIngredientes() {
        store.clear(INGREDIENTES_STORE);
    }
}

window.customElements.define("app-ingredientes-selecionados", IngredientesSelecionados);