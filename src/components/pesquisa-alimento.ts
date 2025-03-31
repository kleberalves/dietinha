import { html, render } from "uhtml";
import { Base } from "./base";
import { store } from "../service/store.service";
import { stores } from "../service/config.service";
import { consultaAlimento } from "../service/pesquisa-alimento.service";


class PesquisaAlimento extends Base {

    props: {
        idx: number;
        id: number;
        mode: string;
    }

    resultList: Alimento[] = [];

    constructor() {
        super();
    }

    onTxtPesquisaInput(target: HTMLInputElement) {
        this.resultList = consultaAlimento(target.value.toLowerCase());
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }

    onAddedItem = (e: CustomEventInit) => {
        if (e.detail.store === stores.Cardapio 
            || e.detail.store === stores.Ingrediente
            || e.detail.store === stores.IngredienteAssistente) {
            //Quando um novo item for adicionado ao cardapio, 
            //deve reiniciar a lista de pesquisa 
            this.restart();
        }
    };

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id"),
            mode: this.p("mode")
        }
        this.render();

        store.onAddedItem(this.onAddedItem);

        store.onEditStarted((e: CustomEventInit) => {
            if (e.detail.store === stores.Cardapio) {
                this.restart();
            }
        });

    }

    restart() {
        var ele: HTMLInputElement = this.querySelector(".txtPesquisa") as HTMLInputElement;
        ele.value = "";

        this.resultList = [];
        this.render();
    }

    render() {

        render(this, html`
        
                <label>Digite o nome do alimento:</label>
                <input type="text" class="textForm txtPesquisa" oninput=${(e) => this.onTxtPesquisaInput(e.currentTarget)} />  
                <div class="list-space-around">
                ${this.resultList.map((item, idx) => html`<app-pesquisa-alimento-item 
                                item=${JSON.stringify(item)}
                                mode=${this.props.mode}
                                idx=${idx} />`)}
                </div>
           `);


    }
}

window.customElements.define("app-pesquisa-alimento", PesquisaAlimento);