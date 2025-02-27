import { html, render } from "uhtml";
import { Base } from "./Base";
import { removeCarecEspec } from "../lib/treatments";
import { store } from "../service/store.service";
import { INGREDIENTES_STORE } from "../service/config.service";
import { consultaAlimento } from "../service/pesquisa-alimento.service";


class PesquisaAlimento extends Base {

    props: {
        idx: number;
        id: number;
    }

    resultList: Alimento[] = [];

    constructor() {
        super();

        store.onAddedItem(INGREDIENTES_STORE, (e: CustomEventInit) => {
            //Quando um novo item for adicionado na lista de ingredientes, 
            //deve reiniciar a lista de pesquisa 

            var ele: HTMLInputElement = this.querySelector("#txtPesquisa") as HTMLInputElement;
            ele.value = "";

            this.resultList = [];
            this.render();
        });
    }


    onTxtPesquisaInput(target: HTMLInputElement) {
        // this.resultList = [];
        // this.render();

        this.resultList = consultaAlimento(target.value.toLowerCase());
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id"),
        }
        this.render();

    }

    render() {

        render(this, html`

            <style>
                </style>
                <label>Digite o nome do alimento</label>
                <input type="text" class="textForm" id="txtPesquisa" oninput=${(e) => this.onTxtPesquisaInput(e.currentTarget)} />  
                ${this.resultList.map((item, idx) => html`<app-pesquisa-alimento-item 
                                item=${JSON.stringify(item)}
                                idx=${idx} />`)}
           `);


    }
}

window.customElements.define("app-pesquisa-alimento", PesquisaAlimento);