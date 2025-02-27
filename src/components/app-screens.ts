import { html, render } from "uhtml";
import { Base } from "./Base";
import { closeScreen, openScreen, swapScreen } from "../lib/screens";
import { store } from "../service/store.service";
import { ALIMENTACAO_STORE, CARDAPIO_STORE, INGREDIENTES_STORE, META_DIARIA_STORE } from "../service/config.service";
import { scrollBodyTop } from "../service/animation.service";

class AppScreens extends Base {

    constructor() {
        super();
    }

    showTabCaloriaDiaria: boolean = false;
    showTabCalculadora: boolean = false;
    showTabCardapio: boolean = false;

    connectedCallback() {
        this.render();

        //Added significa que a meta foi cadastrada pela primeira vez
        store.onAddedItem(META_DIARIA_STORE, (e: CustomEventInit) => {

            this.render();

            openScreen("screenHomeCalculadora");
            closeScreen("screenHomeCaloriaDiaria");
        });

        //Added significa que a meta foi cadastrada pela primeira vez
        store.onAddedItem(INGREDIENTES_STORE, (e: CustomEventInit) => {
            this.render();
        });

        //Added significa que a meta foi cadastrada pela primeira vez
        store.onAddedItem(ALIMENTACAO_STORE, (e: CustomEventInit) => {
            if (e.detail.items.length === 1) {
                this.render();
            }
        });

        //Added significa que a meta foi cadastrada pela primeira vez
        store.onAddedItem(CARDAPIO_STORE, (e: CustomEventInit) => {

            this.render();

            //Executa esse evento apenas na primeira vez em que um item for
            //adicionado no cardápio
            if (e.detail.items.length === 1) {
                openScreen("screenHomeCardapio");
                closeScreen("screenHomeCalculadora");

                scrollBodyTop(0);
            }
        });

    }

    render() {

        var metaDiariaItems: any[] = store.getItems(META_DIARIA_STORE);
        var cardapioItems: any[] = store.getItems(CARDAPIO_STORE);
        var alimentacaoItems: any[] = store.getItems(ALIMENTACAO_STORE);
        var ingredientesItems: any[] = store.getItems(INGREDIENTES_STORE);

        if (metaDiariaItems.length === 0) {
            this.showTabCaloriaDiaria = true;
            //openTab("screenHomeCaloriaDiaria");
        } else if (cardapioItems.length === 0) {
            this.showTabCalculadora = true;
        } else {
            this.showTabCardapio = true;
            this.showTabCaloriaDiaria = true;
            this.showTabCalculadora = true;
            //openTab("screenHomeCardapio");
        }

        render(this, html`
            <style>
                app-main{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                }
                @media (min-width: 600px) {
                    #main{
                        width: 616px;
                    }
                }
                
            </style>

                <div id="main">


               ${this.showTabCaloriaDiaria
                && !this.showTabCalculadora
                && !this.showTabCardapio
                ? html` <div class="wizard-message">
                    <h1>Primeiro passo</h1>
                    <p>
                        Vamos descobrir a sua meta de consumo de calorias por dia. 
                        Insira as informações no formulário abaixo e pressione "<b>Calcular</b>". <br/>
                        Não se preocupe... você poderá atualizar depois.
                    </p>
                </div>` : null}

                ${this.showTabCalculadora
                && this.showTabCalculadora
                && !this.showTabCardapio
                && ingredientesItems.length <= 1
                && cardapioItems.length === 0
                ? html` <div class="wizard-message">
                    <h1>Segundo passo</h1>
                    <p>
                        Faça consultas no campo abaixo para descobrir alimentos e compor 
                        refeições que você mais consome. 
                        <br/> Você pode separar em 4 categorias:<br/>
                        <b>Café da manhã/tarde</b> -  <b>Almoço/jantar</b> -  <b>Lanches</b> -  <b>Sobremesas</b>. <br/>                        
                        Depois do seu Cardápio pronto, basta registrar diariamente quais
                        itens você consumiu.
                    </p>
                </div>` : null}

                ${cardapioItems.length === 1
                && alimentacaoItems.length === 0
                ? html` <div class="wizard-message">
                    <h1>Último passo</h1>
                    <p>
                        Após o cadastro da sua refeição, basta informar
                        quais consumiu utilizando o botão "Consumi este alimento". 
                        <br/>Faça diariamenteo para acompanhar e comparar com a sua meta 
                        diária de calorias e de proteínas.
                    </p>
                </div>` : null}
                
                ${this.showTabCardapio ? html`
                    <div 
                    class=${(this.showTabCaloriaDiaria || this.showTabCalculadora) && cardapioItems.length === 0 ? "screen close" : "screen open"} 
                    id="screenHomeCardapio">
                        <div class="title">Meu cardápio</div>

          
                    <div class="form">
                        <div class="full">
                            <app-cardapio></app-cardapio>
                        </div>
                    </div>
                </div>
                <div class="screen close" id="screenHomeLog">
                     <div class="title">Minhas refeições</div>
                    <div class="form">
                        <app-registro-alimentos></app-registro-alimentos>
                    </div>
                </div>
                `: null}

                ${this.showTabCalculadora ? html`
                    <div 
                        class=${(this.showTabCaloriaDiaria || this.showTabCardapio) ? "screen close" : "screen open"}
                        id="screenHomeCalculadora">
                         <div class="title">Calculadora de alimentos</div>

              
                    <div class="form">
                        <div class="full">
                            <app-pesquisa-alimento></app-pesquisa-alimento>
                        </div>
                        <div class="full">
                            <app-ingredientes-selecionados></app-ingredientes-selecionados>
                        </div>
                    </div>
                </div>` : null}

                ${this.showTabCaloriaDiaria ? html`
                    <div class=${(this.showTabCardapio || this.showTabCalculadora) ? "screen close" : "screen open"}
                        id="screenHomeCaloriaDiaria">
                        <div class="title">Meta diária</div>
                    
                        <div class="form">
                            <app-meta-diaria></app-meta-diaria>

                             <app-container>
                                <app-container-item text="Trocar tema" />
                            </app-container> 

                        </div>
                </div>` : null} 
            </div>


            <div class="screens-nav">
            <div>
                <div class="btn-screen-switch" onclick=${() => swapScreen("screenHomeCardapio")}>
                        <div class="btn">Cardápio</div>
                </div>

                <div class="btn-screen-switch" onclick=${() => swapScreen("screenHomeLog")}>                       
                        <div class="btn">Registro</div>
                </div>

                <div class="btn-screen-switch" onclick=${(e) => swapScreen("screenHomeCalculadora")}>
                        <div class="btn">Calculadora</div>
                </div>

                <div class="btn-screen-switch" onclick=${() => swapScreen("screenHomeCaloriaDiaria")}>     
                     <div class="btn">Meta</div>
                </div>
                </div>
            </div>


        <!-- Solução para passagem de filhos sem utilizar o
             Slot que é exclusivo do ShadowAPI
           -->
           

        `);
    }
}

window.customElements.define("app-screens", AppScreens);