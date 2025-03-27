import { html, render } from "uhtml";
import { Base } from "./base";
import { detectPathScreen, goBack, resizeScreens, swapScreen } from "../lib/screens.lib";
import { store } from "../service/store.service";
import { screens, stores } from "../service/config.service";
import { removeWindow, showLoading } from "../lib/message.lib";
import { setActiveToken } from "../service/login.service";
import { scrollBodyTop } from "../lib/animations";

class AppMain extends Base {

    constructor() {
        super();
    }

    perfilItem: Perfil | null;
    cardapioItems: any[];
    showScreenResetPassword: boolean = false;

    onAddedItem = (e: CustomEventInit) => {
        if (e.detail.store === stores.Cardapio || e.detail.store === stores.RegistroRefeicao) {
            this.render();
            //Executa esse evento apenas na primeira vez em que um item for
            //adicionado no cardápio
            if (e.detail.items.length === 1) {
                swapScreen(screens.Cardapio);
                scrollBodyTop(0);
            }
        }
    }

    connectedCallback() {

        showLoading();
        this.render();

        window.addEventListener("resize", () => {
            resizeScreens();
        });

        window.addEventListener("load", () => {
            //app starts 

            removeWindow();
            if (window.location.hash === "") {
                if (this.perfilItem === null) {
                    swapScreen(screens.Perfil);
                } else if (this.cardapioItems.length > 0) {
                    swapScreen(screens.Cardapio);
                } else {
                    swapScreen(screens.Calculadora);
                }
            } else {
                this.detectPath();
            }

        });

        window.addEventListener("popstate", e => {
            this.detectPath();
        });

        store.onChanged(stores.Perfil, (e: CustomEventInit) => {
            this.render();
        });

        //Added significa que a meta foi cadastrada pela primeira vez
        store.onAddedItem(this.onAddedItem);

        store.onReplacedAll((e: CustomEventInit) => {
            this.render();
        });

    }

    detectPath() {

        const hashPaths = window.location.hash.split("/");

        if (hashPaths[1] === screens.ResetPassword) {
            //Só renderiza a screen resetpassword apenas quando necessário pois o chrome
            //está detectando uma tela de login e sugerindo o preenchimento automático do login e senha
            this.showScreenResetPassword = true;
            this.render();
        }

        detectPathScreen((paths: string[]) => {
            if (paths[1] === screens.Activate || paths[1] === screens.ResetPassword) {
                setActiveToken(paths[2], paths[1]);
            }
        }, () => {
            //Se não encontrar nenhuma página, redirecionar para a perfil
            swapScreen(screens.Perfil);
        });
    }

    btnShowSearchCardapio() {
        let element = this.querySelector<ICardapio>("#appCardapio");
        if (element) {
            element.swapSearch();
        }
    }

    btnPerfilSaveClick() {
        let element = this.querySelector<IAppPerfil>("#appPerfil");
        if (element) {
            element.save();
        }
    }

    render() {

        this.perfilItem = store.getSingle(stores.Perfil);
        this.cardapioItems = store.getItems(stores.Cardapio);
        var registroRefeicaoItems: any[] = store.getItems(stores.RegistroRefeicao);

        render(this, html`
   
                <div id="main">
                
                ${(this.perfilItem !== null
                && this.cardapioItems.length >= 1) ? html`
                    <div 
                    class="screen close" 
                    id="cardapio">
                        <div class="screen-header">
                            <div>
                                <btn-sync />
                            </div>
                            <div class="title">Meu cardápio</div>
                            <div> 
                                <img src="img/busca.svg" class="btn-icon" title="Filtrar o cardápio" @click=${e => this.btnShowSearchCardapio()}/>
                            </div>
                        </div>

                            ${this.cardapioItems.length === 1
                        && registroRefeicaoItems.length === 0
                        ? html` <wizard-message title="Último passo">
                                    Após o cadastro da sua refeição, basta informar
                                    quais consumiu utilizando o botão "Consumi este alimento". 
                                    <br/>Faça diariamente para acompanhar e comparar com a sua meta 
                                    diária de calorias e de proteínas.
                                 </wizard-message>` : null}
                            
                       
                    <div class="form">
                        <div class="full">
                            <app-cardapio id="appCardapio" />
                        </div>
                    </div>
                </div>
                `: null}

                 ${(registroRefeicaoItems.length > 0) ? html`
                <div class="screen close" id="registro">
                        <div class="screen-header">
                            <div>
                                <btn-sync />
                            </div>
                            <div class="title">Minhas refeições</div>
                            <div> 
                            </div>
                        </div>

                   <div class="form">
                        <app-registro-alimentos />
                    </div>
                </div>
                `: null}

           
                <div class="screen close" id="calculadora">

                    <div class="screen-header">
                        <div>
                        </div>
                        <div class="title">Calculadora de alimentos</div>
                        <div> 
                        <img src="img/assistente.svg" title="Assistente virtual" class="btn-icon" @click=${e => swapScreen(screens.Assistente)}/>
                        </div>
                    </div>

                        ${this.perfilItem !== null
                && this.cardapioItems.length === 0
                ? html`  <wizard-message title="Segundo passo">        
                            Faça consultas no campo abaixo para descobrir alimentos e compor 
                            refeições que você mais consome. 
                            <br/> Você pode separar em 4 categorias:<br/>
                            <b>Café da manhã/tarde</b> -  <b>Almoço/jantar</b> -  <b>Lanches</b> -  <b>Sobremesas</b>. <br/>                        
                            Depois do seu Cardápio pronto, basta registrar diariamente quais
                            itens você consumiu.
                        </wizard-message>` : null}
                        <screen-calculadora />
                </div>


                <div class="screen close" id="assistente">

                    <div class="screen-header">
                        <div> 
                            <btn-sync /> 
                        </div>
                        <div class="title">Seu assistente</div>
                        <div> 
                        <img src="img/calculadora.svg" title="Configurações" class="btn-icon" @click=${e => swapScreen(screens.Calculadora)}/>
                        </div>
                    </div>
                        <screen-assistente />
                </div>

                <div class="screen close" id="perfil">
                        <div class="screen-header">
                                <div> 
                                    <btn-sync /> 
                                </div>
                                <div class="title">Perfil</div>
                                <div> 
                                <img src="img/login.svg" title="Autenticar" class="btn-icon" @click=${e => swapScreen(screens.Login)}/>
                                <img src="img/configuracoes.svg" title="Configurações" class="btn-icon" @click=${e => swapScreen(screens.Configuracoes)}/>
                                </div>
                            </div>

                        ${this.perfilItem === null
                ? html`  <wizard-message title="Primeiro passo">
                            Vamos descobrir a sua meta de consumo de calorias e proteínas por dia. 
                            Insira as informações no formulário abaixo e pressione "<b>Calcular</b>". <br/>
                            Não se preocupe... você poderá atualizar depois.
                        </wizard-message>` : null}

                        <app-perfil id="appPerfil" class="form-bar-bottom" />

                        <div class="action-bar-bottom">
                            <button class="btn-main delay11" onclick=${() => this.btnPerfilSaveClick()}>Salvar</button>
                        </div>
                </div>

                <div class="screen close" id="config">
                    <div class="screen-header">
                            <div> 
                                <div class="btn-voltar" onclick=${e => goBack()}>
                                    Voltar
                                </div>
                            </div>
                            <div class="title">Configurações</div>
                            <div> 
                            </div>
                        </div>

                    <app-config />
                </div>

                <div class="screen close" id="login">

                         <div class="screen-header">
                            <div> 
                                <div class="btn-voltar" onclick=${e => swapScreen(screens.Perfil)}>
                                    Voltar
                                </div>
                            </div>
                            <div class="title">Login</div>
                            <div>
                                <btn-sync />
                            </div>
                        </div>
                    <app-login mode="login" />
                </div>

                <div class="screen close" id="activate">

                    <div class="screen-header">
                        <div> 
                        
                        </div>
                        <div class="title">Ativar a conta</div>
                        <div>
                            
                        </div>
                    </div>
                    <app-login mode="activate" />
                </div>

                ${this.showScreenResetPassword ? html`<div class="screen close" id="resetpassword">

                    <div class="screen-header">
                        <div> 
                        
                        </div>
                        <div class="title">Redefinir a senha</div>
                        <div>
                            
                        </div>
                    </div>
                    <app-login mode="resetpassword" />
                </div>` : null}

            </div>
<!--  https://www.svgrepo.com/collection/solar-outline-icons/10 -->

        <div class="screens-nav">
            <span class="logo-main"> </span>
            <div>
                ${(this.perfilItem !== null && this.cardapioItems.length >= 1) ? html`<div class="btn-screen-switch open" id="cardapioNav" onclick=${e => swapScreen(screens.Cardapio)}>
                    <img src="img/cardapio.svg" /> 
                    <div class="btn">Cardápio</div>
                </div>` : null}

                 ${(registroRefeicaoItems.length > 0) ? html`<div class="btn-screen-switch" id="registroNav" onclick=${e => swapScreen(screens.Registro)}>
                    <img src="img/registro.svg" /> 
                    <div class="btn">Registro</div>
                </div>` : null}

                 ${this.perfilItem !== null ? html`<div class="btn-screen-switch" id="calculadoraNav" onclick=${e => swapScreen(screens.Calculadora)}>
                    <img src="img/calculadora.svg" /> 
                    <div class="btn">Calculadora</div>
                </div>` : null}

                ${this.perfilItem !== null ? html`<div class="btn-screen-switch" id="assistenteNav" onclick=${e => swapScreen(screens.Assistente)}>
                    <img src="img/assistente.svg" /> 
                    <div class="btn">Assistente</div>
                </div>` : null}

                <div class="btn-screen-switch" id="perfilNav" onclick=${e => swapScreen(screens.Perfil)}>     
                    <img src="img/perfil.svg" /> 
                    <div class="btn">Perfil</div>
                </div>
            </div>
        </div>
        `);
    }
}

window.customElements.define("app-main", AppMain);