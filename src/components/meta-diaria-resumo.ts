import { Base } from "./Base";
import { html, render } from "uhtml";

class AppMetaDiariaResumo extends Base {

    constructor() {
        super();
    }

    props: {
        resultado: MetaDiaria;
    };

    //Para ativar o evento "attributeChangedCallback"
    static get observedAttributes() {
        return ['resultado'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "resultado") {
            this.props = {
                resultado: JSON.parse(newValue)
            }
            this.render();
        }
    }

    connectedCallback() {
        this.props = {
            resultado: JSON.parse(this.p("resultado")) as MetaDiaria
        }
        //Se for maior que 800gr, sugere 100g a porção.
        this.render();
    }

    render() {

        render(this, html`
                        <style>
                            .resumo-calorias-diarias {
                                margin-bottom: 20px;
                                background-color: var(--theme-color);
                            }
                            .resumo-calorias-diarias>.cols {
                                flex-wrap: wrap;
                                justify-content: space-around;
                                align-items: stretch;
                            }
            
                            .resumo-calorias-diarias>.cols>div {
                                display: flex;
                                flex-wrap: wrap;
                                flex-direction: row;
                                margin-bottom: 5px;
                                margin-top: 5px;
                                margin-right: 15px;
                                align-content: space-between;
                                width: 25%;
                            }

                            .resumo-calorias-diarias>.cols>div b {
                                color: var(--secondary-color);
                                margin-right: 5px;
                            }

                            .resumo-calorias-diarias>.cols>div .title {
                                font-weight: 300;
                                width: 100%;
                                font-size: 22px;
                                color: var(--primary-color);
                                margin-bottom: 10px;
                            }
                            @media (max-width: 400px) {    
                                .resumo-calorias-diarias>.cols>div .title
                                {
                                    font-size: 14px;
                                }
                            }
                            @media (max-width: 320px) {
                                .resumo-calorias-diarias>.cols>div {
                                    width: 100%;
                                }
                            }
                        </style>
                    <div class='list resumo-calorias-diarias' style='margin-bottom: 20px;'>
                            <div class='cols'>
                            ${this.props.resultado.objetivo === "PP"
                ? html`<div><div class='title'>Para emagrecer</div> <div><b>${this.props.resultado.perderPeso} cal </b> por dia </div></div>`
                : html`<div><div class='title'>Para ganhar massa</div> <div><b>${this.props.resultado.ganharMassa} cal </b> por dia </div></div>`}
                            <div><div class='title'>Manter o peso</div> <div><b>${this.props.resultado.manterPeso} cal </b> por dia </div></div>
                            <div><div class='title'>Meta de proteínas</div> <div><b>${this.props.resultado.proteinas}g </b> por dia </div></div>
                            </div>
                   </div>`
        );

    }
}

window.customElements.define("app-meta-diaria-resumo", AppMetaDiariaResumo);