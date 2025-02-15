import { html, render } from "uhtml";
import { Base } from "./Base";
import { removeCarecEspec } from "../lib/treatments";
import { store } from "../service/store.service";
import { INGREDIENTES_STORE } from "../service/config.service";

declare var listaAlimentos: Alimento[];

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


    txtPequisaAlterado(target: HTMLInputElement) {

        this.resultList = [];
        this.render();

        let value = removeCarecEspec(target.value.toLowerCase());
        let values: string[] = value.split(" ");


        for (var i = 0; i < listaAlimentos.length; i++) {

            if (this.resultList.length < 20) {
                var nome = listaAlimentos[i].nome;
                nome = removeCarecEspec(nome);

                let cont = 0;
                for (var s = 0; s < values.length; s++) {
                    if (nome.indexOf(values[s]) > -1) {
                        cont++;
                    }
                }

                if (cont === values.length) {
                    this.resultList.push(listaAlimentos[i]);
                }
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
                ${this.resultList.map((item, idx) => html`<app-pesquisa-alimento-item 
                                nome=${item.nome}
                                id=${item.id}
                                idx=${idx}
                                calorias=${item.calorias}
                                unidade=${item.unidade} />`)}
           `);


    }
}

window.customElements.define("app-pesquisa-alimento", PesquisaAlimento);