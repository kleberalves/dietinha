import { html, render } from "uhtml";
import { adicionarCalculo, calcularAlimento } from "../service/calculo.service";
import { Base } from "./Base";

class PesquisaItem extends Base {

    props: {
        idx: number;
        id: number;
        calorias?: number;
        peso?: number;
        nome?: string,
        unidade?: string,
    }

    constructor() {
        super();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id"),
            nome: this.p("nome"),
            unidade: this.p("unidade"),
            peso: this.p("peso"),
            calorias: this.p("calorias")
        }


        var className = `listItem filtro delay${this.props.idx}`;
        var idItemResultadoCalorias = `itemResultadoCalorias${this.props.idx}`
        var idItemResultadoProteinas = `itemResultadoProteinas${this.props.idx}`
        var idItemResultadoPeso = `itemResultadoPeso${this.props.idx}`;

        render(this, html`
            <link rel="stylesheet" href="css/animations.delay.css" crossorigin="" />
            <!-- <link rel="stylesheet" href="css/components/pesquisa-item.css" crossorigin="" />   -->

        <div class=${className}>
            <div class='title'> ${this.props.nome} <div><span>${this.props.calorias}</span> cal por <span> ${this.props.peso} ${this.props.unidade}</span></div></div> 
            <div class='actions'>
                <input type='number' id=${idItemResultadoPeso} style='width: 85px;height: 40px;' placeholder='peso' oninput=${(e) => calcularAlimento(e.currentTarget.value, this.props.idx, this.props.id)} />
                <div class='action'><b>Calorias</b><div id=${idItemResultadoCalorias}>-</div></div>
                <div class='action'><b>Proteínas</b><div id=${idItemResultadoProteinas}>-</div></div>
                <button class='btn-selecionar' onclick=${() => adicionarCalculo(this.props.idx, this.props.id)}> Selecionar </button>
            </div>
        </div>

        <style>
            .listItem .title {
                color: var(--primary-color);
                border-bottom-color: var(--border-color);
            }

            .listItem .title div {
                color: var(--destaque-color);
            }

            .listItem .title div span {
                color: var(--primary-color);
            }

            .listItem {
                display: flex;
                position: relative;
                justify-content: flex-start;
                align-items: stretch;
                flex-direction: column;
                padding-bottom: 8px;

                padding: 15px;
                border-radius: 21px;

                transition: all 0.3s ease-in-out;
                animation-name: slide-in;
                animation-timing-function: ease-in-out;
                animation-duration: 0.5s;
            }

            @keyframes slide-in {
                from {
                    translate: 0 10vw;
                    /* scale: 50% 1; */
                    opacity: 0; 
                }

                to {
                    translate: 0 0;
                    /* scale: 100% 1; */
                    opacity: 1;
                }
            }

           
            </style>
        
        `);
    }
}

window.customElements.define("app-pesquisa-item", PesquisaItem);