import { html, render } from "uhtml";
import { adicionarCalculo, calcularCaloriaProduto } from "../service/calculo.service";
import { Base } from "./Base";

class PesquisaItem extends Base {

    shadow: ShadowRoot;
    props: {
        idx: number;
        id: number;
        cont?: number;
        calorias?: number;
        peso?: number;
        nome?: string,
        unidade?: string,
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id"),
            cont: this.p("cont"),
            nome: this.p("nome"),
            unidade: this.p("unidade"),
            peso: this.p("peso"),
            calorias: this.p("calorias")
        }


        var className = `listItem filtro delay${this.props.cont}`;
        var idItemResultadoCalorias = `itemResultadoCalorias${this.props.idx}`
        var idItemResultadoProteinas = `itemResultadoProteinas${this.props.idx}`
        var idItemResultadoPeso = `itemResultadoPeso${this.props.idx}`;

        render(this.shadow, html`
            <link rel="stylesheet" href="css/animations.delay.css" crossorigin="" />
            <!-- <link rel="stylesheet" href="css/components/pesquisa-item.css" crossorigin="" />   -->

        <div class=${className}>
            <div class='title'> ${this.props.nome} <div><span>${this.props.calorias}</span> cal por <span> ${this.props.peso} ${this.props.unidade}</span></div></div> 
            <div class='actions'>
                <input type='number' id=${idItemResultadoPeso} style='width: 85px;height: 40px;' placeholder='peso' oninput=${(e) => calcularCaloriaProduto(this.shadow, e.currentTarget.value, this.props.idx, this.props.id)} />
                <div class='action'><b>Calorias</b><div id=${idItemResultadoCalorias}>-</div></div>
                <div class='action'><b>Proteínas</b><div id=${idItemResultadoProteinas}>-</div></div>
                <button class='btn-selecionar' onclick=${() => adicionarCalculo(this.shadow, this.props.idx, this.props.id)}> Selecionar </button>
            </div>
        </div>

        <style>
            .listItem .title {
                color: var(--list-item-title-color);
                border-bottom-color: var(--list-item-title-border-color);
            }

            .listItem .title div {
                color: var(--list-item-title-div-color);
            }

            .listItem .title div span {
                color: var(--list-item-title-div-span-color);
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

            .listItem .actions.right {
                position: absolute;
                top: -29px;
                right: -4px;
                width: 30px;
                height: 100%;

                display: flex;
                flex-direction: column;
                padding-top: 10px;
            }

            .listItem.cardapio {
                padding-bottom: 0px;
                margin-bottom: 20px;
            }

            .listItem.filtro {
                margin-top: 5px;
                margin-bottom: 10px;
            }

            .listItem .title {
                display: flex;
                font-size: 20px;
                margin-bottom: 5px;
                font-weight: 100;
                justify-content: space-between;
                border-bottom: 1px solid #373737;
                padding-bottom: 9px;

            }

            .listItem .title div {
                font-size: 15px;
                margin-top: 5px;
                font-weight: 500;
            }

            .listItem .title div span {
                font-size: 14px;
            }

            .listItem .actions {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
            }

            @media (max-width: 399px) {
                .listItem .actions {
                    justify-content: space-around;
                    align-items: center;
                    flex-wrap: wrap;
                    margin-top: 15px;
                }

                .listItem .actions .btn-selecionar {
                    margin-top: 15px;
                }

                .listItem .actions .action {
                    width: 33.33333%;
                }
            }

            .listItem .actions .action {
                font-size: 15px;
                text-align: center;
            }
            </style>
        
        `);
    }
}

window.customElements.define("ka-pesquisa-item", PesquisaItem);