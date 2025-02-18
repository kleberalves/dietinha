import { html, render } from "uhtml";
import { adicionarCalculo, calcularAlimentoColher as calcularAlimentoQuantidade, calcularAlimentoPeso } from "../service/calculo.service";
import { Base } from "./Base";

class PesquisaItem extends Base {

    props: {
        idx: number;
        id: string;
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

        var className = `listItem pesquisa-alimento-item filtro delay${this.props.idx}`;
        var idItemResultadoCalorias = `itemResultadoCalorias${this.props.idx}`
        var idItemResultadoProteinas = `itemResultadoProteinas${this.props.idx}`
        var inputPeso = `inputPeso${this.props.idx}`;
        var inputQuantidade = `inputQuantidade${this.props.idx}`;

        var unidade: string = this.props.unidade ? this.props.unidade : "g";

        render(this, html`
            <link rel="stylesheet" href="css/animations.delay.css" crossorigin="" />

        <div class=${className}>
            <div class='title'> ${this.props.nome} <div><span>${this.props.calorias}</span> cal por <span> 100 ${unidade}</span></div></div> 
            <div class='actions pesquisa-alimento-item-actions'>
                <div> <b>Colheres de sopa</b>
                    <input type='number' id=${inputQuantidade} style='width: 85px;height: 40px;' placeholder='Colher de sopa' 
                        oninput=${(e) => calcularAlimentoQuantidade(e.currentTarget.value, this.props.idx, this.props.id)} />    
                </div>
                <div> <b>Peso em gramas</b>
                    <input type='number' id=${inputPeso} style='width: 85px;height: 40px;' placeholder='peso' 
                        oninput=${(e) => calcularAlimentoPeso(e.currentTarget.value, this.props.idx, this.props.id)} />
                </div>
                <div class='action'><b>Calorias</b><div id=${idItemResultadoCalorias}>-</div></div>
                <div class='action'><b>Proteínas</b><div id=${idItemResultadoProteinas}>-</div></div>
                <button class='btn-selecionar' onclick=${() => adicionarCalculo(this.props.idx, this.props.id)}> Selecionar </button>
            </div>
        </div>

        <style>
            .pesquisa-alimento-item-actions {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
            }

            .pesquisa-alimento-item-actions > div {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            @media (max-width: 599px) {
                .pesquisa-alimento-item-actions {
                    align-items: center;
                    flex-wrap: wrap;
                    margin-top: 15px;
                }
                .pesquisa-alimento-item-actions > div {
                    margin-top: 10px;
                    width: 47%;
                }
            }
            @media (max-width: 399px) {
                .pesquisa-alimento-item-actions .btn-selecionar {
                    margin-top: 15px;
                }

                .pesquisa-alimento-item-actions > div {
                    margin-top: 10px;
                    width: 100%;
                }
            }

            .pesquisa-alimento-item-actions .action {
                font-size: 15px;
                text-align: center;
            }
            
            .listItem .title {
                color: var(--primary-color);
                border-bottom-color: var(--border-color);
            }

            .listItem .title div {
                color: var(--destaque-color);
            }

            .listItem .title div span {
                color: var(--secondary-color);
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

window.customElements.define("app-pesquisa-alimento-item", PesquisaItem);