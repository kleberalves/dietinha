import { html, render } from "uhtml";
import { Base } from "../base";

class WizardMessage extends Base {

    props: {
        title: string;
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.props = {
            title: this.p("title")
        }
        this.render();
        this.renderChildren();
    }

    btnOk() {
        this.style.display = "none";
    }

    render() {
        this.childrenHTML = this.innerHTML;
        render(this, html`
            <h1>${this.props.title}</h1>
            <p>
                <span id="container"></span>
            </p>
            <div class="bar-actions"><button class="btn-ok btn-sm" @click=${() => this.btnOk()}>OK</button></div>
        `);
    }
}

window.customElements.define("wizard-message", WizardMessage);