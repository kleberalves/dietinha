import { html, render } from "uhtml";
import { Base } from "./base";
import { removerIngrediente } from "../service/cardapio.service";
import { removerIngredienteAssistente } from "../service/assistente.service";

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

    getClassCategoria(categoria: string): string {

        categoria = categoria.toLowerCase();

        if (categoria === "pães") {
            return "paes";
        }

        if (categoria === "batatas") {
            return "batatas";
        }

        if (categoria === "cereais e derivados") {
            return "cereais";
        }

        if (categoria === "carnes e derivados") {
            return "carnes";
        }

        if (categoria === "verduras, hortaliças e derivados") {
            return "verduras"
        }

        if (categoria === "leguminosas e derivados") {
            return "legumes"
        }

        if (categoria === "frutas e derivados") {
            return "frutas"
        }

        if (categoria === "queijos") {
            return "queijos"
        }

        if (categoria === "feijões") {
            return "feijoes"
        }

        if (categoria === "ovos e derivados") {
            return "ovos"
        }

        if (categoria === "pescados e frutos do mar") {
            return "peixes"
        }

        if (categoria === "massas") {
            return "massas"
        }

        if (categoria === "cervejas") {
            return "cervejas"
        }

        if (categoria === "frangos") {
            return "frangos"
        }

        return "";
    }


    render() {
        var unidade = this.props.ingrediente.unidade === undefined ? "g" : this.props.ingrediente.unidade;

        var className = "item "

        if (this.props.ingrediente.categoria) {
            className += this.getClassCategoria(this.props.ingrediente.categoria);
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