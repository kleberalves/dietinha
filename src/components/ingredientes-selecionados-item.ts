import { html, render } from "uhtml";
import { Base } from "./base";
import { removerIngrediente } from "../service/cardapio.service";
import { removerIngredienteAssistente } from "../service/assistente.service";
import { getClassCategoria } from "../service/calculo.service";

class IngredientesSelecionadosItem extends Base {

    props: {
        idx: number;
        id: number;
        mode: string;
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
            mode: this.p("mode"),
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

        var className = "item "
        if (this.props.ingrediente.categoria) {
            className += getClassCategoria(this.props.ingrediente.categoria);
        }
        
        render(this, html`
        
                <div class=${className}> <b> ${this.props.ingrediente.nome} </b> 
                
                ${this.props.mode !== "simple" ? html`
                        <div class="desc">${this.props.ingrediente.calorias} calorias e ${this.props.ingrediente.proteinas} proteínas em ${this.props.ingrediente.peso}${unidade}</div>        
                        <div class='actions right'>
                            <div class="btn-trash" title="Remover" onclick=${() => removerIngrediente(this.props.ingrediente.id)}></div>
                        </div>
                ` : html`<div class='actions right'>
                    <div class="btn-trash" title="Remover" onclick=${() => removerIngredienteAssistente(this.props.ingrediente.id)}></div>
                </div>`}
                
                ${this.props.ingrediente.categoria ? html`<div class="categoria">${this.props.ingrediente.categoria}</div>` : null}
            </div>` );
    }



}

window.customElements.define("app-ingredientes-selecionados-item", IngredientesSelecionadosItem);