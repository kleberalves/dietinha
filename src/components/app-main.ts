import { html, render } from "uhtml";
import { Base } from "./Base";
import { swapTabs } from "../lib/tabs";
import { swapTheme } from "../service/config.service";

class AppMain extends Base {

    constructor() {
        super();
    }

    connectedCallback() {
        //Se for maior que 800gr, sugere 100g a porção.
        this.render();
    }

    render() {
        render(this, html`
        
                <div id="main">
                <div class="tab close" id="tabHomeCardapio">
                    <div class="btn-tab-switch" onclick=${() => swapTabs(0)}>
                        <div class="title">Meu cardápio</div>
                        <div class="btn"></div>
                    </div>
                    <div class="form">
                        <div class="full">
                            <app-cardapio></app-cardapio>
                        </div>
                    </div>
                </div>
                <div class="tab close" id="tabHomeCalculadora">
                    <div class="btn-tab-switch" onclick=${() => swapTabs(1)}>
                        <div class="title">Calculadora de alimentos</div>
                        <div class="btn"></div>
                    </div>
                    <div class="form">
                        <div class="full">
                            <app-pesquisa-alimento></app-pesquisa-alimento>
                        </div>
                        <div class="full">
                            <app-ingredientes-selecionados></app-ingredientes-selecionados>
                        </div>
                    </div>
                </div>

                <div class="tab close" id="tabHomeLog">
                    <div class="btn-tab-switch" onclick=${() => swapTabs(2)}>
                        <div class="title">Minhas refeições</div>
                        <div class="btn"></div>
                    </div>
                    <div class="form">
                        <app-alimentos-consumidos></app-alimentos-consumidos>
                    </div>
                </div>

                <div class="tab close" id="tabHomeCaloriaDiaria">
                    <div class="btn-tab-switch" onclick=${() => swapTabs(3)}>
                        <div class="title">Consumo diário de calorías</div>
                        <div class="btn"></div>
                    </div>
                    <div class="form">
                        <app-meta-diaria></app-meta-diaria>
                    </div>
                </div>
            </div>


        <!-- Solução para passagem de filhos sem utilizar o
             Slot que é exclusivo do ShadowAPI
           -->
            <app-container>
                <app-container-item text="Trocar tema" />
            </app-container> 

        `);
    }
}

window.customElements.define("app-main", AppMain);