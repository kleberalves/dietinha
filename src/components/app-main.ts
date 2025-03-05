import { html, render } from "uhtml";
import { Base } from "./Base";
import { detectPathScreen, resizeScreens, swapScreen } from "../lib/screens.lib";
import { store } from "../service/store.service";
import { ALIMENTACAO_STORE, CARDAPIO_STORE, INGREDIENTES_STORE, META_DIARIA_STORE } from "../service/config.service";
import { scrollBodyTop } from "../service/animation.service";

class AppMain extends Base {

    constructor() {
        super();
    }

    showTabCaloriaDiaria: boolean = false;
    showTabCalculadora: boolean = false;
    showTabCardapio: boolean = false;
    showView: string = "perfil";

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
        let element = this.querySelector<IIngredientesSelecionados>("#appIngredientesSelecionados");
        if (element) {
            element.adicionarItemCardapio();
        }
    }
    btnMetaDiariaSaveClick() {
        let element = this.querySelector<IAppMetaDiaria>("#appMetaDiaria");
        if (element) {
            element.save();
        }
    }
    btnShowConfig() {
        if (this.showView === "config") {
            this.showView = "perfil"
        } else {
            this.showView = "config";
        }

        this.render();
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
                    class="screen close" 
                    id="cardapio">
                        <div class="screen-header">
                            <div></div>
                            <div class="title">Meu cardápio</div>
                            <div> 
                                <img src="img/busca.svg" class="btn-icon" @click=${e => this.btnShowSearchCardapio()}/>
                            </div>
                        </div>

                            ${cardapioItems.length === 1
                        && alimentacaoItems.length === 0
                        ? html` <div class="wizard-message">
                                <h1>Último passo</h1>
                                <p>
                                    Após o cadastro da sua refeição, basta informar
                                    quais consumiu utilizando o botão "Consumi este alimento". 
                                    <br/>Faça diariamente para acompanhar e comparar com a sua meta 
                                    diária de calorias e de proteínas.
                                </p>
                            </div>` : null}
                            
                       
                    <div class="form">
                        <div class="full">
                            <app-cardapio id="appCardapio" />
                        </div>
                    </div>
                </div>
                <div class="screen close" id="registro">
                     <div class="title">Minhas refeições</div>
                    <div class="form">
                        <app-registro-alimentos />
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
                            <app-pesquisa-alimento />
                        </div>
                        <div class="full">
                            <app-ingredientes-selecionados id="appIngredientesSelecionados" />
                        </div>
                    </div>

                    ${ingredientesItems.length > 0 ? html`<div class="action-bar-bottom"><button class='btn-main' onclick=${e => this.btnAdicionarIngredientesCardapio()}> Adicionar ao cardápio </button></div>` : null}
                </div>` : null}

                
                ${metaDiariaItems.length >= 0 ? html`
                    <div class="screen close" id="perfil">

                    <div class="screen-header">
                            <div></div>
                            <div class="title">Perfil</div>
                            <div> 
                                <img src="img/configuracoes.svg" class="btn-icon" @click=${e => this.btnShowConfig()}/>
                            </div>
                        </div>
                
                    ${this.showView === "perfil" ? html`
                        ${this.showTabCaloriaDiaria
                        && !this.showTabCalculadora
                        && !this.showTabCardapio
                        ? html` <div class="wizard-message">
                            <h1>Primeiro passo</h1>
                            <p>
                                Vamos descobrir a sua meta de consumo de calorias e proteínas por dia. 
                                Insira as informações no formulário abaixo e pressione "<b>Calcular</b>". <br/>
                                Não se preocupe... você poderá atualizar depois.
                            </p>
                        </div>` : null}

                        <app-meta-diaria id="appMetaDiaria" class="form-bar-bottom" />

                        <div class="action-bar-bottom">
                            <button class="btn-main delay11" onclick=${() => this.btnMetaDiariaSaveClick()}>Salvar</button>
                        </div>
                    `: null}

                    ${this.showView === "config" ? html`
                        <app-config />
                    `: null}
                 
                </div>` : null} 

                <div class="screen close" id="notfound">
                    <div class="form">
                        <div class="row">
                            <h4> 404 Seção não encontrada. </h4>
                        </div>
                    </div>
                </div>
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
        `);

        //app starts
        if (metaDiariaItems.length === 0) {
            swapScreen("perfil");
        } else if (window.location.hash === "" &&
            (this.showTabCaloriaDiaria || this.showTabCalculadora) &&
            cardapioItems.length > 0) {
            swapScreen("cardapio");
        } else {
            detectPathScreen();
        }

        window.addEventListener("popstate", e => {
            detectPathScreen();
        });
    }
}

window.customElements.define("app-main", AppMain);