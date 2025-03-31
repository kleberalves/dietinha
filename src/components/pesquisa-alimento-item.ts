import { html, render } from "uhtml";
import { adicionarCalculo, calcularAlimentoUnidade, calcularAlimentoPeso, getUnidades, getClassCategoria } from "../service/calculo.service";
import { Base } from "./base";
import { showPopup } from "../lib/message.lib";
import { addIngredienteAssistente } from "../service/assistente.service";

class PesquisaItem extends Base {

    props: {
        idx: number;
        item: Alimento;
        mode: string;
    }

    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['item', 'idx', 'mode'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== null) {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    showFormCalculo: Boolean = false;

    selecionarSimple(tipo: string) {
        addIngredienteAssistente(this.props.item.id, tipo);
    }

    showCalculo() {
        var idItemResultadoCalorias = `itemResultadoCalorias${this.props.idx}`
        var idItemResultadoProteinas = `itemResultadoProteinas${this.props.idx}`
        var inputPeso = `inputPeso${this.props.idx}`;
        var inputQuantidade = `inputQuantidade${this.props.idx}`;

        let unidadeAlt: UnidadeAlt = getUnidades(this.props.item.id)

        showPopup(html`<div class='title'> ${this.props.item.nome} <div>
            <div class='actions pesquisa-alimento-item-actions'>   
                <div class='action'> 
                    <b>${(this.props.item.unidade && this.props.item.unidade === "ml") ? html`Quantidade ml` : html`Peso em gramas`}</b>
                    <input type='number' class="input-number" id=${inputPeso} placeholder='Quantidade' 
                        oninput=${(e) => calcularAlimentoPeso(e.currentTarget.value, this.props.idx, this.props.item.id, unidadeAlt.peso)} />
                </div>

                ${(unidadeAlt.peso > 0) ? html`<div class='action'> <b>${unidadeAlt.desc}</b>
                    <input type='number' class="input-number" id=${inputQuantidade} placeholder=${unidadeAlt.desc} 
                        oninput=${(e) => calcularAlimentoUnidade(e.currentTarget.value, this.props.idx, this.props.item.id, unidadeAlt.peso)} />    
                </div>` : null}

                <div class="bar">
                    <div class='action'><b>Calorias</b><div id=${idItemResultadoCalorias}>-</div></div>
                    <div class='action'><b>Proteínas</b><div id=${idItemResultadoProteinas}>-</div></div>
                </div>
              </div>`,
            () => {
                adicionarCalculo(this.props.idx, this.props.item.id, unidadeAlt);
            });
    }

    render() {

        this.props = {
            idx: this.p("idx"),
            mode: this.p("mode"),
            item: JSON.parse(this.p("item")),
        }


        var className = `listItem pesquisa-alimento-item filtro delay${this.props.idx} `;

        if (this.props.item.categoria) {
            className += getClassCategoria(this.props.item.categoria);
        }

        var unidade: string = this.props.item.unidade ? this.props.item.unidade : "g";

        if (this.props.mode !== "simple") {

            render(this, html`<div class= ${className}>
                                <div class='title'> ${this.props.item.nome} <div> <span>${this.props.item.calorias} </span> cal por <span> 100</span >${unidade} </div></div>
                                <button class='btn-selecionar' onclick=${() => this.showCalculo()}> Calcular </button>
                            </div>`);
        } else {
            render(this, html`<div class= ${className}>
                <div class='title'> ${this.props.item.nome}</div>
                <div class="bar-actions">
                     <button class='btn-selecionar' onclick=${() => this.selecionarSimple("CA")}> Café da manhã/tarde </button>
                    <button class='btn-selecionar' onclick=${() => this.selecionarSimple("AJ")}> Almoço/Jantar </button>
                </div>
            </div>`);
        }
    }
}

window.customElements.define("app-pesquisa-alimento-item", PesquisaItem);