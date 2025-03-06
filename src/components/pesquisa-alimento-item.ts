import { html, render } from "uhtml";
import { adicionarCalculo, calcularAlimentoColher as calcularAlimentoUnidade, calcularAlimentoPeso } from "../service/calculo.service";
import { Base } from "./base";
import { showPopup } from "../lib/message.lib";

declare var listaAlimentosUnidades: AlimentoUnidade[];

class PesquisaItem extends Base {

    props: {
        idx: number;
        item: Alimento;
    }

    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['item', 'idx'];
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

    showCalculo() {
        var idItemResultadoCalorias = `itemResultadoCalorias${this.props.idx}`
        var idItemResultadoProteinas = `itemResultadoProteinas${this.props.idx}`
        var inputPeso = `inputPeso${this.props.idx}`;
        var inputQuantidade = `inputQuantidade${this.props.idx}`;

        let rating: number = 0;
        let label: string = "";

        for (let i = 0; i < listaAlimentosUnidades.length; i++) {

            if (this.props.item.id === listaAlimentosUnidades[i].idAlimento) {
                rating = listaAlimentosUnidades[i].rating;
                label = listaAlimentosUnidades[i].label;
                break;
            }

        }

        showPopup(html`<div class='title'> ${this.props.item.nome} <div>
            <div class='actions pesquisa-alimento-item-actions'>   
                <div class='action'> 
                    <b>${(this.props.item.unidade && this.props.item.unidade === "ml") ? html`Quantidade ml` : html`Peso em gramas`}</b>
                    <input type='number' class="input-number" id=${inputPeso} placeholder='Qtd' 
                        oninput=${(e) => calcularAlimentoPeso(e.currentTarget.value, this.props.idx, this.props.item.id, rating)} />
                </div>

                ${(rating > 0) ? html`<div class='action'> <b>${label}</b>
                    <input type='number' class="input-number" id=${inputQuantidade} placeholder=${label} 
                        oninput=${(e) => calcularAlimentoUnidade(e.currentTarget.value, this.props.idx, this.props.item.id, rating)} />    
                </div>` : null}

                <div class='action'><b>Calorias</b><div id=${idItemResultadoCalorias}>-</div></div>
                <div class='action'><b>Proteínas</b><div id=${idItemResultadoProteinas}>-</div></div>
              </div>`,
            () => {
                adicionarCalculo(this.props.idx, this.props.item.id);
            });

        // this.showFormCalculo = !this.showFormCalculo;
        // this.render();
    }

    render() {

        this.props = {
            idx: this.p("idx"),
            item: JSON.parse(this.p("item")),
        }

        var className = `listItem pesquisa - alimento - item filtro delay${this.props.idx}`;
        var unidade: string = this.props.item.unidade ? this.props.item.unidade : "g";

        render(this, html`<div class= ${className}>
                                <div class='title'> ${this.props.item.nome} <div> <span>${this.props.item.calorias} </span> cal por <span> 100${unidade}</span > </div></div>
                                <button class='btn-selecionar' onclick=${() => this.showCalculo()}> Calcular </button>
                            </div>`);
    }
}

window.customElements.define("app-pesquisa-alimento-item", PesquisaItem);