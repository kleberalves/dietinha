import { html, render } from "uhtml";
import { Base } from "../base";
import zxcvbn from "zxcvbn";

class InputPassword extends Base {

    constructor() {
        super();
    }

    props: {
        value: string;
        name: string;
    }

    passwordValue: string;

    get value() {
        return this.passwordValue;
    }

    onChange = (evt: (e: CustomEventInit) => void) => {
        this.addEventListener("ON_CHANGED", (e: CustomEventInit) => {
            evt(e);
        });
    };

    dispatchOnChange = (value: string) => {
        this.dispatchEvent(
            new CustomEvent("ON_CHANGE", {
                detail: {
                    value: value
                }
            })
        );
    }

    connectedCallback() {

        this.props = {
            value: this.p("value"),
            name: this.p("name")
        }

        this.render();
    }

    createPasswordLabelBR = (resultScore) => {
        switch (resultScore) {
            case 1:
                return 'Sua senha está fraca demais... Tente colocar algum caracter especial.';
            case 2:
                return 'Ainda está fraca... Capricha!';
            case 3:
                return 'A sua senha está boa!';
            case 4:
                return 'Muito forte! Parece o Hulk! ;-)';
        }
    }

    createPasswordLabel = (resultScore: number) => {
        switch (resultScore) {
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return 'Weak';
        }
    }
    testScore: number = 0;

    typePwd: string = "password";

    onInput = (target: HTMLInputElement) => {

        if (target.value) {
            this.passwordValue = target.value;

            //TODO Ver opções para reduzir o bundle substituindo o "zxcvbn"
            let testedResult = zxcvbn(target.value);

            if (testedResult.score === 0) {
                this.testScore = 1;
            } else {
                this.testScore = testedResult.score;
            }

            this.dispatchOnChange(target.value);
        }

        this.render();
    }

    eyeIcon = "eye-closed.svg";

    changeView() {

        if (this.eyeIcon === "eye-closed.svg") {
            this.eyeIcon = "eye.svg";
            this.typePwd = "text";
        } else {
            this.eyeIcon = "eye-closed.svg";
            this.typePwd = "password";
        }

        this.render();
    }

    render() {
        let progressClass = `password-strength-meter-progress strength-${this.createPasswordLabel(this.testScore)}`;

        render(this, html`
            <div id="btnChange" onclick=${() => this.changeView()}><img src=${`img/${this.eyeIcon}`} class="btn-icon-small" /></div>
            <input type=${this.typePwd} name=${this.props.name} {...props.register} defaultValue=${this.props.value} onInput=${(e) => this.onInput(e.currentTarget)} />
                <div class="password-strength-meter">
                    <progress
                        class=${progressClass}
                        value=${this.testScore}
                        max="4" />
         
                    <label
                        class="password-strength-meter-label">
                        ${(this.testScore > 0) ? html`${this.createPasswordLabelBR(this.testScore)}` : null}
                    </label>
            </div>
        `);

    }
}

window.customElements.define("input-password", InputPassword);
