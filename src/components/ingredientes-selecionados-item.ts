import { html, render } from "uhtml";
import { Base } from "./Base";
import { store } from "../service/store.service";
import { INGREDIENTES_STORE } from "../app";

class IngredientesSelecionadosItem extends Base {

    props: {
        idx: number;
        id: number;
        ingrediente: Ingrediente;
    }

    listaIngredientes: Ingrediente[] = [];

    constructor() {
        super();
    }

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id"),
            ingrediente: JSON.parse(this.p("ingrediente"))
        }

        this.render();
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "ingrediente") {
            this.props = {
                ...this.props,
                ingrediente: JSON.parse(newValue)
            }

            this.render();
        }
    }

    render() {
        var unidade = this.props.ingrediente.unidade === undefined ? "g" : this.props.ingrediente.unidade;
        render(this, html`<div class='item'> <b> ${this.props.ingrediente.nome} </b> ${this.props.ingrediente.calorias} calorias e ${this.props.ingrediente.proteinas} proteínas em ${this.props.ingrediente.peso} ${unidade}
            <button class='btn-remove' onclick=${() => this.removerCalculo(this.props.ingrediente.id)}> x </button>
            </div>` );
    }

    removerCalculo(id: string) {

        store.removeItemById(INGREDIENTES_STORE, id);

    }

}

window.customElements.define("app-ingredientes-selecionados-item", IngredientesSelecionadosItem);