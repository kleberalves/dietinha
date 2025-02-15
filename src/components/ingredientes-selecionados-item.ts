import { html, render } from "uhtml";
import { Base } from "./Base";
import { store } from "../service/store.service";
import { INGREDIENTES_STORE } from "../service/config.service";

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

      //Para ativar o evento "attributeChangedCallback"
      static get observedAttributes() {
        return ['ingrediente'];
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
        render(this, html`
        <style>
      
            .selecionados .item {
                padding-right: 30px;
                position: relative;
                margin-bottom: 15px;
                border-bottom: 1px solid #ccc;
                padding-top: 7px;
                padding-bottom: 20px;
            }

            .selecionados .item b {
                font-weight: 300;
                font-size: 20px;
                color: var(--secondary-color);
            }
            </style>
        
        <div class='item'> <b> ${this.props.ingrediente.nome} </b> ${this.props.ingrediente.calorias} calorias e ${this.props.ingrediente.proteinas} proteínas em ${this.props.ingrediente.peso}${unidade}
            <button class='btn-remove' onclick=${() => this.removerCalculo(this.props.ingrediente.id)}> x </button>
            </div>` );
    }

    removerCalculo(id: string) {

        store.removeItemById(INGREDIENTES_STORE, id);

    }

}

window.customElements.define("app-ingredientes-selecionados-item", IngredientesSelecionadosItem);