import { Base } from "./base";
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

        let calorias:number = 0;
        let objetivo: string = "";

        if(this.props.resultado.objetivo === "PP"){
            objetivo = "Emagrecimento";
            calorias = this.props.resultado.perderPeso;
        } else {
            objetivo = "Ganhanho de massa";
            calorias = this.props.resultado.ganharMassa;
        }

        render(this, html`
                    <div class='list resumo-calorias-diarias'>
                            <div class='cols'>
                            <div class='title-objetivo'>${objetivo}</div>
                            <div><div class='title'>Calorias por dia</div> <div><b>${calorias} cal </b> </div></div>
                            <div><div class='title'>Proteínas por dia</div> <div><b>${this.props.resultado.proteinas}g </b> </div></div>
                            </div>
                   </div>`
        );

    }
}

window.customElements.define("app-meta-diaria-resumo", AppMetaDiariaResumo);