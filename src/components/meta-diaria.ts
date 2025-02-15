import { html, render } from "uhtml";
import { Base } from "./Base";
import { META_DIARIA_STORE } from "../service/config.service";
import { setNumberField, setRadiosCheck } from "../lib/forms";
import { store } from "../service/store.service";
import { calcularMetaDiaria } from "../service/meta-diaria.service";
import { closeTab, openTab } from "../lib/tabs";

class AppMetaDiaria extends Base {

    constructor() {
        super();
    }

    boxResumo: any = null;
    txtBtn: string = "Calcular";

    connectedCallback() {

        store.onUpdatedItem(META_DIARIA_STORE, (e: CustomEventInit) => {
            this.showMetaDiaria(e.detail.item);
        });

        store.onAddedItem(META_DIARIA_STORE, (e: CustomEventInit) => {
            this.showMetaDiaria(e.detail.item);

            openTab("tabHomeCalculadora");
            closeTab("tabHomeCaloriaDiaria");
        });

        let items: any[] = store.getItems(META_DIARIA_STORE);
        if (items.length > 0) {
            this.showMetaDiaria(items[0]);
        } else {
            this.render();
        }
    }

    showMetaDiaria(resultado: any) {

        this.txtBtn = "Atualizar";
        this.boxResumo = html`<app-meta-diaria-resumo resultado=${JSON.stringify(resultado)} />`

        this.render();

        setRadiosCheck("inputGenero", resultado.genero);
        setRadiosCheck("inputAtividadeFisica", resultado.atividadeFisica);
        setNumberField("inputPeso", resultado.peso);
        setNumberField("inputAltura", resultado.altura);
        setNumberField("inputIdade", resultado.idade);
    }

    render() {
        render(this, html` 

            ${this.boxResumo}

            <style>
                app-meta-diaria {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                app-meta-diaria > .col-3,
                app-meta-diaria > .col-2{
                    display: flex;
                    justify-content: space-between;
                }

                app-meta-diaria > .col-3 > div,
                app-meta-diaria > .col-2 > div{
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
                app-meta-diaria > .col-3 > div {
                    width: 30%;
                }

                app-meta-diaria > .col-2 > div {
                    width: 47%;
                }

                app-meta-diaria >.title {
                    font-size: 20px;
                    width: 100%;
                    font-weight: bold;
                    margin-top: 0px;
                    margin-bottom: 20px;
                }

                @media (max-width: 400px) {

                    app-meta-diaria > .col-3,
                    app-meta-diaria > .col-2{
                        flex-direction: column;
                    }

                    app-meta-diaria>.col-3>div,
                    app-meta-diaria>.col-2>div {
                        width: 99%;
                    }
                }

                app-meta-diaria>.action {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
                </style>

            <div class="col-3">
                <div>
                    <label>Digite a idade:</label>
                    <input type="number" class="textForm" id="inputIdade" />
                </div>
                <div>
                    <label>Digite o peso:</label>
                    <input type="number" class="textForm" id="inputPeso" />
                    <div class="descricao">Em quilogramas.</div>
                </div>
                <div>
                    <label>Digite a altura:</label>
                    <input type="number" id="inputAltura" />
                    <div class="descricao">Em centímetros.</div>
                </div>
            </div>
            <div class="col-2">
                <div>
                    <label>Gênero:</label>
                    <div class="radio">
                        <input type="radio" name="inputGenero" value="M" /> <span>Masculino</span>
                    </div>
                    <div class="radio">
                        <input type="radio" name="inputGenero" value="F" /> <span>Feminino</span>
                    </div>
                </div>
                <div>
                    <label>Nível de atividade física:</label>
                    <div class="radio">
                        <input type="radio" name="inputAtividadeFisica" value="1" /> <span>Sedentário</span>
                    </div>
                    <div class="radio">
                        <input type="radio" name="inputAtividadeFisica" value="2" /> <span>Ativo </span>
                    </div>
                    <div class="radio">
                        <input type="radio" name="inputAtividadeFisica" value="3" /> <span>Muito ativo </span>
                    </div>
                </div>
            </div>
            <div class="action">
                <button class="btn-main" onclick=${() => calcularMetaDiaria()}>${this.txtBtn}</button>
            </div>
           `);
    }
}

window.customElements.define("app-meta-diaria", AppMetaDiaria);