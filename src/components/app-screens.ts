import { html, render } from "uhtml";
import { Base } from "./Base";
import { swapScreen } from "../lib/screens.lib";
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
            swapScreen("calculadora");
        });

        store.onAddedItem(INGREDIENTES_STORE, (e: CustomEventInit) => {
            this.render();
        });
        store.onRemovedItem(INGREDIENTES_STORE, (e: CustomEventInit) => {
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

                
                ${this.showTabCardapio ? html`
                    <div 
                    class=${(this.showTabCaloriaDiaria || this.showTabCalculadora) && cardapioItems.length === 0 ? "screen close" : "screen open"} 
                    id="cardapio">
                    
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
                            
                        <div class="title">Meu cardápio</div>

          
                    <div class="form">
                        <div class="full">
                            <app-cardapio></app-cardapio>
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
       
                         <div class="title">Calculadora de alimentos</div>

              
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

                ${this.showTabCaloriaDiaria ? html`
                    <div class=${(this.showTabCardapio || this.showTabCalculadora) ? "screen close" : "screen open"}
                        id="perfil">

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

                        
                        <div class="title">Meta diária</div>
                            <app-meta-diaria id="meta" class="form-bar-bottom"></app-meta-diaria>
                              <div class="action-bar-bottom">
                                <button class="btn-main" onclick=${() => this.btnMetaDiariaSaveClick()}>Salvar</button>
                            </div>
                 
                </div>` : null} 
            </div>
<!--  https://www.svgrepo.com/collection/solar-outline-icons/10 -->

            <div class="screens-nav">
            <div>
                <div class="btn-screen-switch open" id="cardapioNav" onclick=${e => swapScreen("cardapio")}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.2626 3.26045C7.38219 2.13044 8.33828 1.25 9.5 1.25H14.5C15.6617 1.25 16.6178 2.13044 16.7374 3.26045C17.5005 3.27599 18.1603 3.31546 18.7236 3.41895C19.4816 3.55818 20.1267 3.82342 20.6517 4.34835C21.2536 4.95027 21.5125 5.70814 21.6335 6.60825C21.75 7.47522 21.75 8.57754 21.75 9.94513V16.0549C21.75 17.4225 21.75 18.5248 21.6335 19.3918C21.5125 20.2919 21.2536 21.0497 20.6517 21.6517C20.0497 22.2536 19.2919 22.5125 18.3918 22.6335C17.5248 22.75 16.4225 22.75 15.0549 22.75H8.94513C7.57754 22.75 6.47522 22.75 5.60825 22.6335C4.70814 22.5125 3.95027 22.2536 3.34835 21.6517C2.74643 21.0497 2.48754 20.2919 2.36652 19.3918C2.24996 18.5248 2.24998 17.4225 2.25 16.0549V9.94513C2.24998 8.57754 2.24996 7.47522 2.36652 6.60825C2.48754 5.70814 2.74643 4.95027 3.34835 4.34835C3.87328 3.82342 4.51835 3.55818 5.27635 3.41895C5.83973 3.31546 6.49952 3.27599 7.2626 3.26045ZM7.26496 4.76087C6.54678 4.7762 5.99336 4.81234 5.54735 4.89426C4.98054 4.99838 4.65246 5.16556 4.40901 5.40901C4.13225 5.68577 3.9518 6.07435 3.85315 6.80812C3.75159 7.56347 3.75 8.56458 3.75 10V16C3.75 17.4354 3.75159 18.4365 3.85315 19.1919C3.9518 19.9257 4.13225 20.3142 4.40901 20.591C4.68577 20.8678 5.07435 21.0482 5.80812 21.1469C6.56347 21.2484 7.56458 21.25 9 21.25H15C16.4354 21.25 17.4365 21.2484 18.1919 21.1469C18.9257 21.0482 19.3142 20.8678 19.591 20.591C19.8678 20.3142 20.0482 19.9257 20.1469 19.1919C20.2484 18.4365 20.25 17.4354 20.25 16V10C20.25 8.56458 20.2484 7.56347 20.1469 6.80812C20.0482 6.07434 19.8678 5.68577 19.591 5.40901C19.3475 5.16556 19.0195 4.99838 18.4527 4.89426C18.0066 4.81234 17.4532 4.7762 16.735 4.76087C16.6058 5.88062 15.6544 6.75 14.5 6.75H9.5C8.34559 6.75 7.39424 5.88062 7.26496 4.76087ZM9.5 2.75C9.08579 2.75 8.75 3.08579 8.75 3.5V4.5C8.75 4.91421 9.08579 5.25 9.5 5.25H14.5C14.9142 5.25 15.25 4.91421 15.25 4.5V3.5C15.25 3.08579 14.9142 2.75 14.5 2.75H9.5ZM6.25 10.5C6.25 10.0858 6.58579 9.75 7 9.75H7.5C7.91421 9.75 8.25 10.0858 8.25 10.5C8.25 10.9142 7.91421 11.25 7.5 11.25H7C6.58579 11.25 6.25 10.9142 6.25 10.5ZM9.75 10.5C9.75 10.0858 10.0858 9.75 10.5 9.75H17C17.4142 9.75 17.75 10.0858 17.75 10.5C17.75 10.9142 17.4142 11.25 17 11.25H10.5C10.0858 11.25 9.75 10.9142 9.75 10.5ZM6.25 14C6.25 13.5858 6.58579 13.25 7 13.25H7.5C7.91421 13.25 8.25 13.5858 8.25 14C8.25 14.4142 7.91421 14.75 7.5 14.75H7C6.58579 14.75 6.25 14.4142 6.25 14ZM9.75 14C9.75 13.5858 10.0858 13.25 10.5 13.25H17C17.4142 13.25 17.75 13.5858 17.75 14C17.75 14.4142 17.4142 14.75 17 14.75H10.5C10.0858 14.75 9.75 14.4142 9.75 14ZM6.25 17.5C6.25 17.0858 6.58579 16.75 7 16.75H7.5C7.91421 16.75 8.25 17.0858 8.25 17.5C8.25 17.9142 7.91421 18.25 7.5 18.25H7C6.58579 18.25 6.25 17.9142 6.25 17.5ZM9.75 17.5C9.75 17.0858 10.0858 16.75 10.5 16.75H17C17.4142 16.75 17.75 17.0858 17.75 17.5C17.75 17.9142 17.4142 18.25 17 18.25H10.5C10.0858 18.25 9.75 17.9142 9.75 17.5Z" fill="#fff"/>
                    </svg>   
                     <div class="btn">Cardápio</div>
                </div>

                <div class="btn-screen-switch" id="registroNav" onclick=${e => swapScreen("registro")}>
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14Z" fill="#fff"/>
                    <path d="M17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18Z" fill="#fff"/>
                    <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="#fff"/>
                    <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="#fff"/>
                    <path d="M7 14C7.55229 14 8 13.5523 8 13C8 12.4477 7.55229 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14Z" fill="#fff"/>
                    <path d="M7 18C7.55229 18 8 17.5523 8 17C8 16.4477 7.55229 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z" fill="#fff"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 1.75C7.41421 1.75 7.75 2.08579 7.75 2.5V3.26272C8.412 3.24999 9.14133 3.24999 9.94346 3.25H14.0564C14.8586 3.24999 15.588 3.24999 16.25 3.26272V2.5C16.25 2.08579 16.5858 1.75 17 1.75C17.4142 1.75 17.75 2.08579 17.75 2.5V3.32709C18.0099 3.34691 18.2561 3.37182 18.489 3.40313C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.1071 5.38961 22.4392 6.33855 22.5969 7.51098C22.75 8.65018 22.75 10.1058 22.75 11.9435V14.0564C22.75 15.8941 22.75 17.3498 22.5969 18.489C22.4392 19.6614 22.1071 20.6104 21.3588 21.3588C20.6104 22.1071 19.6614 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0565 22.75H9.94359C8.10585 22.75 6.65018 22.75 5.51098 22.5969C4.33856 22.4392 3.38961 22.1071 2.64124 21.3588C1.89288 20.6104 1.56076 19.6614 1.40314 18.489C1.24997 17.3498 1.24998 15.8942 1.25 14.0564V11.9436C1.24998 10.1058 1.24997 8.65019 1.40314 7.51098C1.56076 6.33855 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40313C5.7439 3.37182 5.99006 3.34691 6.25 3.32709V2.5C6.25 2.08579 6.58579 1.75 7 1.75ZM5.71085 4.88976C4.70476 5.02502 4.12511 5.27869 3.7019 5.7019C3.27869 6.12511 3.02502 6.70476 2.88976 7.71085C2.86685 7.88123 2.8477 8.06061 2.83168 8.25H21.1683C21.1523 8.06061 21.1331 7.88124 21.1102 7.71085C20.975 6.70476 20.7213 6.12511 20.2981 5.7019C19.8749 5.27869 19.2952 5.02502 18.2892 4.88976C17.2615 4.75159 15.9068 4.75 14 4.75H10C8.09318 4.75 6.73851 4.75159 5.71085 4.88976ZM2.75 12C2.75 11.146 2.75032 10.4027 2.76309 9.75H21.2369C21.2497 10.4027 21.25 11.146 21.25 12V14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25H10C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14V12Z" fill="#fff"/>
                    </svg>                  
                        <div class="btn">Registro</div>
                </div>

                <div class="btn-screen-switch" id="calculadoraNav" onclick=${e => swapScreen("calculadora")}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9375 1.25H12.0625C14.1308 1.24998 15.7678 1.24997 17.0485 1.44129C18.3725 1.63907 19.4223 2.05481 20.2395 2.96274C21.0464 3.85936 21.4066 4.99222 21.5798 6.42355C21.75 7.83014 21.75 9.63498 21.75 11.9478V12.0522C21.75 14.365 21.75 16.1699 21.5798 17.5765C21.4066 19.0078 21.0464 20.1406 20.2395 21.0373C19.4223 21.9452 18.3725 22.3609 17.0485 22.5587C15.7678 22.75 14.1308 22.75 12.0625 22.75H11.9375C9.8692 22.75 8.23221 22.75 6.95147 22.5587C5.62747 22.3609 4.57769 21.9452 3.76055 21.0373C2.95359 20.1406 2.59338 19.0078 2.42018 17.5765C2.24998 16.1699 2.24999 14.365 2.25 12.0522V11.9478C2.24999 9.63499 2.24998 7.83014 2.42018 6.42355C2.59338 4.99222 2.95359 3.85936 3.76055 2.96274C4.57769 2.05481 5.62747 1.63907 6.95147 1.44129C8.23221 1.24997 9.86922 1.24998 11.9375 1.25ZM7.17309 2.92483C6.04626 3.09316 5.37637 3.40965 4.87549 3.96619C4.36443 4.53404 4.06563 5.31193 3.90932 6.60374C3.7513 7.90972 3.75 9.62385 3.75 12C3.75 14.3762 3.7513 16.0903 3.90932 17.3963C4.06563 18.6881 4.36443 19.466 4.87549 20.0338C5.37637 20.5903 6.04626 20.9068 7.17309 21.0752C8.33029 21.248 9.8552 21.25 12 21.25C14.1448 21.25 15.6697 21.248 16.8269 21.0752C17.9537 20.9068 18.6236 20.5903 19.1245 20.0338C19.6356 19.466 19.9344 18.6881 20.0907 17.3963C20.2487 16.0903 20.25 14.3762 20.25 12C20.25 9.62385 20.2487 7.90972 20.0907 6.60374C19.9344 5.31193 19.6356 4.53404 19.1245 3.96619C18.6236 3.40965 17.9537 3.09316 16.8269 2.92483C15.6697 2.75196 14.1448 2.75 12 2.75C9.8552 2.75 8.33029 2.75196 7.17309 2.92483ZM8.91612 5.24994C8.9438 5.24997 8.97176 5.25 9 5.25H15C15.0282 5.25 15.0562 5.24997 15.0839 5.24994C15.4647 5.24954 15.7932 5.24919 16.0823 5.32667C16.8588 5.53472 17.4653 6.1412 17.6733 6.91766C17.7508 7.2068 17.7505 7.53533 17.7501 7.91612C17.75 7.9438 17.75 7.97176 17.75 8C17.75 8.02824 17.75 8.0562 17.7501 8.08389C17.7505 8.46468 17.7508 8.7932 17.6733 9.08234C17.4653 9.8588 16.8588 10.4653 16.0823 10.6733C15.7932 10.7508 15.4647 10.7505 15.0839 10.7501C15.0562 10.75 15.0282 10.75 15 10.75H9C8.97176 10.75 8.9438 10.75 8.91612 10.7501C8.53533 10.7505 8.2068 10.7508 7.91766 10.6733C7.1412 10.4653 6.53472 9.8588 6.32667 9.08234C6.24919 8.7932 6.24954 8.46468 6.24994 8.08389C6.24997 8.0562 6.25 8.02824 6.25 8C6.25 7.97176 6.24997 7.9438 6.24994 7.91612C6.24954 7.53533 6.24919 7.2068 6.32667 6.91766C6.53472 6.1412 7.1412 5.53472 7.91766 5.32667C8.2068 5.24919 8.53533 5.24954 8.91612 5.24994ZM9 6.75C8.48673 6.75 8.37722 6.75644 8.30589 6.77556C8.04707 6.84491 7.84491 7.04707 7.77556 7.30589C7.75644 7.37722 7.75 7.48673 7.75 8C7.75 8.51327 7.75644 8.62278 7.77556 8.69412C7.84491 8.95293 8.04707 9.1551 8.30589 9.22445C8.37722 9.24356 8.48673 9.25 9 9.25H15C15.5133 9.25 15.6228 9.24356 15.6941 9.22445C15.9529 9.1551 16.1551 8.95293 16.2244 8.69412C16.2436 8.62278 16.25 8.51327 16.25 8C16.25 7.48673 16.2436 7.37722 16.2244 7.30589C16.1551 7.04707 15.9529 6.84491 15.6941 6.77556C15.6228 6.75644 15.5133 6.75 15 6.75H9Z" fill="#fff"/>
                        <path d="M9 13C9 13.5523 8.55229 14 8 14C7.44772 14 7 13.5523 7 13C7 12.4477 7.44772 12 8 12C8.55229 12 9 12.4477 9 13Z" fill="#fff"/>
                        <path d="M9 17C9 17.5523 8.55229 18 8 18C7.44772 18 7 17.5523 7 17C7 16.4477 7.44772 16 8 16C8.55229 16 9 16.4477 9 17Z" fill="#fff"/>
                        <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="#fff"/>
                        <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="#fff"/>
                        <path d="M17 13C17 13.5523 16.5523 14 16 14C15.4477 14 15 13.5523 15 13C15 12.4477 15.4477 12 16 12C16.5523 12 17 12.4477 17 13Z" fill="#fff"/>
                        <path d="M17 17C17 17.5523 16.5523 18 16 18C15.4477 18 15 17.5523 15 17C15 16.4477 15.4477 16 16 16C16.5523 16 17 16.4477 17 17Z" fill="#fff"/>
                    </svg>
                        <div class="btn">Calculadora</div>
                </div>

                <div class="btn-screen-switch" id="perfilNav" onclick=${e => swapScreen("perfil")}>     
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 6.25C7.48122 6.25 6.25 7.48122 6.25 9C6.25 10.5188 7.48122 11.75 9 11.75C10.5188 11.75 11.75 10.5188 11.75 9C11.75 7.48122 10.5188 6.25 9 6.25ZM7.75 9C7.75 8.30965 8.30965 7.75 9 7.75C9.69036 7.75 10.25 8.30965 10.25 9C10.25 9.69036 9.69036 10.25 9 10.25C8.30965 10.25 7.75 9.69036 7.75 9Z" fill="#fff"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 12.25C7.80424 12.25 6.68461 12.4907 5.83616 12.915C5.03258 13.3168 4.25 14.0106 4.25 15L4.24987 15.0625C4.24834 15.5728 4.24576 16.4322 5.06023 17.0218C5.43818 17.2953 5.9369 17.4698 6.55469 17.581C7.1782 17.6932 7.97721 17.75 9 17.75C10.0228 17.75 10.8218 17.6932 11.4453 17.581C12.0631 17.4698 12.5618 17.2953 12.9398 17.0218C13.7542 16.4322 13.7517 15.5728 13.7501 15.0625L13.75 15C13.75 14.0106 12.9674 13.3168 12.1638 12.915C11.3154 12.4907 10.1958 12.25 9 12.25ZM5.75 15C5.75 14.8848 5.86285 14.5787 6.50698 14.2566C7.10625 13.957 7.98662 13.75 9 13.75C10.0134 13.75 10.8937 13.957 11.493 14.2566C12.1371 14.5787 12.25 14.8848 12.25 15C12.25 15.6045 12.2115 15.6972 12.0602 15.8067C11.9382 15.895 11.6869 16.0134 11.1797 16.1047C10.6782 16.1949 9.97721 16.25 9 16.25C8.02279 16.25 7.3218 16.1949 6.82031 16.1047C6.31311 16.0134 6.06182 15.895 5.93977 15.8067C5.78849 15.6972 5.75 15.6045 5.75 15Z" fill="#fff"/>
                        <path d="M19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25H15C14.5858 11.25 14.25 11.5858 14.25 12C14.25 12.4142 14.5858 12.75 15 12.75H19Z" fill="#fff"/>
                        <path d="M19.75 9C19.75 9.41422 19.4142 9.75 19 9.75H14C13.5858 9.75 13.25 9.41422 13.25 9C13.25 8.58579 13.5858 8.25 14 8.25H19C19.4142 8.25 19.75 8.58579 19.75 9Z" fill="#fff"/>
                        <path d="M19 15.75C19.4142 15.75 19.75 15.4142 19.75 15C19.75 14.5858 19.4142 14.25 19 14.25H16C15.5858 14.25 15.25 14.5858 15.25 15C15.25 15.4142 15.5858 15.75 16 15.75H19Z" fill="#fff"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.94358 3.25H14.0564C15.8942 3.24998 17.3498 3.24997 18.489 3.40314C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.1071 5.38961 22.4392 6.33856 22.5969 7.51098C22.75 8.65018 22.75 10.1058 22.75 11.9435V12.0564C22.75 13.8942 22.75 15.3498 22.5969 16.489C22.4392 17.6614 22.1071 18.6104 21.3588 19.3588C20.6104 20.1071 19.6614 20.4392 18.489 20.5969C17.3498 20.75 15.8942 20.75 14.0565 20.75H9.94359C8.10585 20.75 6.65018 20.75 5.51098 20.5969C4.33856 20.4392 3.38961 20.1071 2.64124 19.3588C1.89288 18.6104 1.56076 17.6614 1.40314 16.489C1.24997 15.3498 1.24998 13.8942 1.25 12.0564V11.9436C1.24998 10.1058 1.24997 8.65019 1.40314 7.51098C1.56076 6.33856 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40314C6.65019 3.24997 8.10583 3.24998 9.94358 3.25ZM5.71085 4.88976C4.70476 5.02503 4.12511 5.27869 3.7019 5.7019C3.27869 6.12511 3.02503 6.70476 2.88976 7.71085C2.75159 8.73851 2.75 10.0932 2.75 12C2.75 13.9068 2.75159 15.2615 2.88976 16.2892C3.02503 17.2952 3.27869 17.8749 3.7019 18.2981C4.12511 18.7213 4.70476 18.975 5.71085 19.1102C6.73851 19.2484 8.09318 19.25 10 19.25H14C15.9068 19.25 17.2615 19.2484 18.2892 19.1102C19.2952 18.975 19.8749 18.7213 20.2981 18.2981C20.7213 17.8749 20.975 17.2952 21.1102 16.2892C21.2484 15.2615 21.25 13.9068 21.25 12C21.25 10.0932 21.2484 8.73851 21.1102 7.71085C20.975 6.70476 20.7213 6.12511 20.2981 5.7019C19.8749 5.27869 19.2952 5.02503 18.2892 4.88976C17.2615 4.75159 15.9068 4.75 14 4.75H10C8.09318 4.75 6.73851 4.75159 5.71085 4.88976Z" fill="#fff"/>
                        </svg>
                     <div class="btn">Perfil</div>
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