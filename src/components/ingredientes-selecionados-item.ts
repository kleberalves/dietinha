import { html, render } from "uhtml";
import { Base } from "./base";
import { store } from "../service/store.service";
import { stores } from "../service/config.service";

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
        
                <div class='item'> <b> ${this.props.ingrediente.nome} </b> <br/>${this.props.ingrediente.calorias} calorias e ${this.props.ingrediente.proteinas} proteínas em ${this.props.ingrediente.peso}${unidade}

                <div class='actions right'>
                    <div class="btn-trash"  onclick=${() => this.removerCalculo(this.props.ingrediente.id)}></div>
                </div>
            </div>` );
    }

    removerCalculo(id?: string) {

        if (id)
            store.removeItemById(stores.Ingrediente, id);

    }

}

window.customElements.define("app-ingredientes-selecionados-item", IngredientesSelecionadosItem);