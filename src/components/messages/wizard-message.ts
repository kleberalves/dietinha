import { html, render } from "uhtml";
import { Base } from "../base";

class WizardMessage extends Base implements IWizardMessage {

    props: {
        title: string;
        supressClose: boolean;
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.props = {
            title: this.p("title"),
            supressClose: this.pb("supress-close")
        }
        this.render();
        this.renderChildren();
    }

    onOk = (env: (e: CustomEventInit) => void) => {
        this.addEventListener("ON_OK", (e) => {
            if (env) {
                env(e);
            }
        })
    }

    btnOk() {

        if (!this.props.supressClose) {
            this.style.display = "none";
        }

        this.dispatchEvent(
            new CustomEvent("ON_OK")
        );
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