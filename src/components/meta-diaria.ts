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
            this.showMetaDiaria(e.detail.item as MetaDiaria);
        });

        store.onAddedItem(META_DIARIA_STORE, (e: CustomEventInit) => {
            this.showMetaDiaria(e.detail.item as MetaDiaria);

            openTab("tabHomeCalculadora");
            closeTab("tabHomeCaloriaDiaria");
        });

        let items: MetaDiaria[] = store.getItems<MetaDiaria[]>(META_DIARIA_STORE);
        if (items.length > 0) {
            this.showMetaDiaria(items[0]);
        } else {
            this.render();
        }
    }

    showMetaDiaria(resultado: MetaDiaria) {

        this.txtBtn = "Atualizar";
        this.boxResumo = html`<app-meta-diaria-resumo resultado=${JSON.stringify(resultado)} />`

        this.render();

        setRadiosCheck("inputGenero", resultado.genero);
        setRadiosCheck("inputAtividadeFisica", resultado.atividadeFisica);
        setNumberField("inputPeso", resultado.peso);
        setNumberField("inputAltura", resultado.altura);
        setNumberField("inputIdade", resultado.idade);
        setRadiosCheck("inputObjetivo", resultado.objetivo);
    }

    render() {
        render(this, html` 

            ${this.boxResumo}
                
            <div class="col-2">
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
                    <input type="text" pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]" id="inputAltura" />
                    <div class="descricao">Em centímetros.</div>
                </div>
            </div>
            <div class="col-2">
                <div>
                    <label>Objetivo:</label>
                    <div class="radio">
                        <input type="radio" name="inputObjetivo" value="MM" /> <span>Ganhar massa magra</span>
                    </div>
                    <div class="radio">
                        <input type="radio" name="inputObjetivo" value="PP" /> <span>Perder peso</span>
                    </div>
                </div>
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