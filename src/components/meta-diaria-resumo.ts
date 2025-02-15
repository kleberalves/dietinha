import { Base } from "./Base";
import { html, render } from "uhtml";

class AppMetaDiariaResumo extends Base {

    constructor() {
        super();
    }

    props: any;

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
            resultado: JSON.parse(this.p("resultado"))
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
                            }
            
                            .resumo-calorias-diarias>.cols>div {
                                display: flex;
                                flex-wrap: wrap;
                                flex-direction: row;
                                margin-bottom: 5px;
                                margin-top: 5px;
                            }

                            .resumo-calorias-diarias>.cols>div b {
                                color: var(--secondary-color);
                                margin-right: 5px;
                            }

                            .resumo-calorias-diarias>.cols>div .title {
                               font-weight: 300;
                                width: 100%;
                                color: var(--primary-color);
                            }
                            @media (max-width: 600px) {
                                .resumo-calorias-diarias>.cols>div {
                                    width: 45%;
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
                            <div><div class='title'>Manter o peso</div> <b>${this.props.resultado.manterPeso} cal </b> por dia </div>
                            <div><div class='title'>Para emagrecer</div> <b>${this.props.resultado.perderPeso} cal </b> por dia </div>
                            <div><div class='title'>Para ganhar massa</div> <b>${this.props.resultado.ganharMassa} cal </b> por dia </div>
                            <div><div class='title'>Proteínas</div> <b>${this.props.resultado.proteinas}g </b> por dia </div>
                            </div>
                   </div>`
        );

    }
}

window.customElements.define("app-meta-diaria-resumo", AppMetaDiariaResumo);