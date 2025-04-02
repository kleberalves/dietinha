import { html, render } from "uhtml";
import { Base } from "../base";

class ProgressBar extends Base {

    constructor() {
        super();
    }

    props: {
        target: string;
        descricao: string;
        percentual: number | undefined;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== null) {
            this.render();
        }
    }

    static get observedAttributes() {
        return ['target', 'percentual', 'descricao'];
    }

    connectedCallback() {
        this.render();
    }


    render() {
        
        this.props = {
            target: this.p("target"),
            percentual: this.pn("percentual"),
            descricao: this.p("descricao")
        }

        if (this.props.percentual) {
            render(this, html`
            <div class="progress-bar">
                <div class="text textTarget">${this.props.descricao}<span class='text target'>${this.props.target}</span></div>
                <div class="progress">
                    ${this.props.percentual}%
                </div>
            </div>`);

            let barProgress = this.querySelector<HTMLDivElement>(".progress");
            if (barProgress) {
                let value = this.props.percentual;
                if (value > 100) {
                    value = 100;
                    barProgress.classList.add("red");
                }

                //Mantém o máximo de 93% para ajustar a largura no HTML
                value = (value * 93) / 100;

                barProgress.style.width = value.toString() + "%";
            }
        }
    }
}

window.customElements.define("progress-bar", ProgressBar);