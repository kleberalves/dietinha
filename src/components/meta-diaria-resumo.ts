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