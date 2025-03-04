import { html, render } from "uhtml";
import { Base } from "./Base";
import { resizeScreens, swapScreen } from "../lib/screens.lib";
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

        window.addEventListener("resize", () => {
            resizeScreens();
        });

        //Added significa que a meta foi cadastrada pela primeira vez
        store.onAddedItem(META_DIARIA_STORE, (e: CustomEventInit) => {
            this.render();
            swapScreen("calculadora");
        });

        store.onAddedItem(INGREDIENTES_STORE, (e: CustomEventInit) => {
            this.render();
        });
        store.onRemovedItem(INGREDIENTES_STORE, (e: CustomEventInit) => {
            this.render();
        });
        store.onCleared(INGREDIENTES_STORE, (e: CustomEventInit) => {
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
                swapScreen("cardapio");

                scrollBodyTop(0);
            }
        });

    }

    btnShowSearchCardapio() {
        let element = this.querySelector<ICardapio>("#appCardapio");
        if (element) {
            element.swapSearch();
        }
    }
    btnAdicionarIngredientesCardapio() {
        let element = this.querySelector<IIngredientesSelecionados>("#ingredientes");
        if (element) {
            element.adicionarItemCardapio();
        }
    }
    btnMetaDiariaSaveClick() {
        let element = this.querySelector<IAppMetaDiaria>("#meta");
        if (element) {
            element.save();
        }
    }
    render() {

        var metaDiariaItems: any[] = store.getItems(META_DIARIA_STORE);
        var cardapioItems: any[] = store.getItems(CARDAPIO_STORE);
        var alimentacaoItems: any[] = store.getItems(ALIMENTACAO_STORE);
        var ingredientesItems: any[] = store.getItems(INGREDIENTES_STORE);

        if (metaDiariaItems.length === 0) {
            this.showTabCaloriaDiaria = true;
            swapScreen("perfil");
        } else if (cardapioItems.length === 0) {
            this.showTabCalculadora = true;
        } else {
            this.showTabCardapio = true;
            this.showTabCaloriaDiaria = true;
            this.showTabCalculadora = true;
        }

        render(this, html`
            <style>
                app-main{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                }
            </style>

                <div id="main">

                
                ${(metaDiariaItems.length > 0
                && cardapioItems.length >= 1) ? html`
                    <div 
                    class=${(this.showTabCaloriaDiaria || this.showTabCalculadora) && cardapioItems.length === 0 ? "screen close" : "screen open"} 
                    id="cardapio">
                        <div class="screen-header">
                            <div></div>
                            <div class="title">Meu cardápio</div>
                            <div> 
                                <img src="img/busca.svg" class="btn-search" @click=${e => this.btnShowSearchCardapio()}/>
                            </div>
                        </div>

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
                            
                       
          
                    <div class="form">
                        <div class="full">
                            <app-cardapio id="appCardapio"></app-cardapio>
                        </div>
                    </div>
                </div>
                <div class="screen close" id="registro">
                     <div class="title">Minhas refeições</div>
                    <div class="form">
                        <app-registro-alimentos></app-registro-alimentos>
                    </div>
                </div>
                `: null}

                ${this.showTabCalculadora ? html`
                    <div 
                        class=${(this.showTabCaloriaDiaria || this.showTabCardapio) ? "screen close" : "screen open"}
                        id="calculadora">

                         <div class="title">Calculadora de alimentos</div>


                          ${metaDiariaItems.length > 0
                    && ingredientesItems.length === 0
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
       

              
                    <div class="form">
                        <div class="full">
                            <app-pesquisa-alimento></app-pesquisa-alimento>
                        </div>
                        <div class="full">
                            <app-ingredientes-selecionados id="ingredientes"></app-ingredientes-selecionados>
                        </div>
                    </div>

                    ${ingredientesItems.length > 0 ? html`<div class="action-bar-bottom"><button class='btn-main' onclick=${e => this.btnAdicionarIngredientesCardapio()}> Adicionar ao cardápio </button></div>` : null}
                </div>` : null}

                
                ${metaDiariaItems.length >= 0 ? html`
                    <div class="screen close" id="perfil">

                <div class="title">Perfil</div>

                
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

                        
                       
                        <app-meta-diaria id="meta" class="form-bar-bottom"></app-meta-diaria>
                        <div class="action-bar-bottom">
                            <button class="btn-main" onclick=${() => this.btnMetaDiariaSaveClick()}>Salvar</button>
                        </div>
                 
                </div>` : null} 
            </div>
<!--  https://www.svgrepo.com/collection/solar-outline-icons/10 -->

            <div class="screens-nav">
            <div>
                ${(metaDiariaItems.length > 0 && cardapioItems.length >= 1) ? html`<div class="btn-screen-switch open" id="cardapioNav" onclick=${e => swapScreen("cardapio")}>
                    <img src="img/cardapio.svg" /> 
                    <div class="btn">Cardápio</div>
                </div>` : null}

                 ${(alimentacaoItems.length > 0) ? html`<div class="btn-screen-switch" id="registroNav" onclick=${e => swapScreen("registro")}>
                    <img src="img/registro.svg" /> 
                    <div class="btn">Registro</div>
                </div>` : null}

                 ${metaDiariaItems.length > 0 ? html`<div class="btn-screen-switch" id="calculadoraNav" onclick=${e => swapScreen("calculadora")}>
                    <img src="img/calculadora.svg" /> 
                    <div class="btn">Calculadora</div>
                </div>` : null}

                <div class="btn-screen-switch" id="perfilNav" onclick=${e => swapScreen("perfil")}>     
                    <img src="img/perfil.svg" /> 
                    <div class="btn">Perfil</div>
                </div>
                </div>
            </div>


        <!-- Solução para passagem de filhos sem utilizar o
             Slot que é exclusivo do ShadowAPI
           -->
           

        `);

        if (metaDiariaItems.length === 0) {
            swapScreen("perfil");
        }
    }
}

window.customElements.define("app-screens", AppScreens);