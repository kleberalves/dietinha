import { html, render } from "uhtml";
import { Base } from "./Base";
import { removeCarecEspec } from "../lib/treatments";
import { STORE_ADDED_ITEM } from "../service/store.service";
import { INGREDIENTES_STORE } from "../app";

declare var listaAlimentos: Alimento[];

class PesquisaAlimento extends Base {

    props: {
        idx: number;
        id: number;
    }

    resultList: Alimento[] = [];

    constructor() {
        super();

        window.addEventListener(STORE_ADDED_ITEM, (e: CustomEventInit) => {
            //Quando um novo item for adicionado na lista de ingredientes, 
            //deve reiniciar a lista de pesquisa 

            if (e.detail.store !== INGREDIENTES_STORE) {
                return;
            }

            var ele: HTMLInputElement = this.querySelector("#txtPesquisa") as HTMLInputElement;
            ele.value = "";

            this.resultList = [];
            this.render();
        });
    }


    txtPequisaAlterado(target: HTMLInputElement) {

        this.resultList = [];
        this.render();

        for (var i = 0; i < listaAlimentos.length; i++) {

            var nome = listaAlimentos[i].nome;
            nome = removeCarecEspec(nome);

            if (nome.indexOf(target.value.toLowerCase()) > -1 && this.resultList.length < 20) {
                this.resultList.push(listaAlimentos[i]);
            }
        }

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
                <input type="text" class="textForm" id="txtPesquisa" oninput=${(e) => this.txtPequisaAlterado(e.currentTarget)} />  
                ${this.resultList.map((item, idx) => html`<app-pesquisa-item 
                                nome=${item.nome}
                                id=${item.id}
                                idx=${idx}
                                unidade=${item.unidade} />`)}
           `);


    }
}

window.customElements.define("app-pesquisa-alimento", PesquisaAlimento);