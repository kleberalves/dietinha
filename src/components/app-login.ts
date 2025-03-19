//

import { html, render } from "uhtml";
import { Base } from "./base";
import { getLoginInfo, login, logout, resetPassword, sendActive, sendResetPassword } from "../service/login.service";
import { store } from "../service/store.service";
import { screens, stores } from "../service/config.service";
import { formatDate } from "../lib/treatments";
import { sync } from "../service/sync.service";
import { getInputString, validateFields } from "../lib/forms";
import { showError, showOk } from "../lib/message.lib";
import { swapScreen } from "../lib/screens.lib";


class AppLogin extends Base {

    items: CardapioItem[] = [];
    itemsView: CardapioItem[] = [];
    showSearch: boolean = false;
    loginInfo: AuthInfo | null;

    modeView: string = "login";

    constructor() {
        super();
    }


    attributeChangedCallback(name, oldValue, newValue) {

    }

    static get observedAttributes() {
        return ['mode'];
    }


    connectedCallback() {

        if (this.p("mode") !== undefined && this.p("mode") !== null) {
            this.modeView = this.p("mode");
        }

        store.onCleared(stores.Login, (e: CustomEventInit) => {
            this.loginInfo = null;
            this.render();
        });

        store.onChanged(stores.Login, (e: CustomEventInit) => {

            if (e.detail.item && e.detail.item.activeTokenMode === screens.Active) {
                sendActive().then(() => {
                    showOk("Conta ativada com sucesso.");
                    swapScreen(screens.Login);
                    this.loadInfoLogin();
                }).catch(() => {
                });
            }
        });

        this.loadInfoLogin();

        //Como vai manipular o DOM, é necessário renderizar antes.
        let inputSenha = this.querySelector("#inputSenha");
        if (inputSenha) {
            inputSenha.addEventListener("ON_CHANGE", (e: CustomEventInit) => {
                //console.log(e.detail);
            });
        }
    }

    loadInfoLogin() {
        this.loginInfo = getLoginInfo();

        if (this.loginInfo && this.loginInfo.email === undefined) {
            this.loginInfo = null;
        }
        this.render();
    }

    btnLogout(element: HTMLButtonElement) {
        logout();
    }

    async btnLogin(e: SubmitEvent) {
        e.preventDefault();

        let email = getInputString('#inputEmail', "Insira o seu email");
        let senha = getInputString('#inputSenha', "Insira a sua senha");

        if (validateFields([email, senha]) && email.value && senha.value) {
            await login(email.value, senha.value);
            this.loadInfoLogin();
            sync();
        }

    }

    btnEnviarNovaSenhaUser() {

        try {
            if (this.loginInfo) {
                sendResetPassword(this.loginInfo.email);
            }
        } catch (e: any) {
            showError(e.message);
        }

    }

    btnEnviarNovaSenha(e: any) {
        console.log(e);
        e.preventDefault();


        let email = getInputString('#inputEmail', "Insira o seu email");

        try {
            if (validateFields([email]) && email.value) {
                sendResetPassword(email.value);
            }
        } catch (e: any) {
            showError(e.message);
        }

    }

    async resetPassword(e: SubmitEvent) {
        e.preventDefault();

        let senha = getInputString('#inputNewPassword', "Insira a sua senha");

        try {
            if (validateFields([senha]) && senha.value) {
                await resetPassword(senha.value);
            }
        } catch (e: any) {
            showError(e.message);
        }
    }


    render() {
        render(this, html`

            ${this.modeView === "login" ? html`
                ${(this.loginInfo !== null && this.loginInfo.email !== "guest") ? html`
                     <div class="form">
                        <div class="col-1">
                            <div>
                                <label>${this.loginInfo.email}</label>
                               <div class="text-mini">
                                     ${this.loginInfo.created ? formatDate(this.loginInfo.created, "dd/mm hh:MM") : null}
                                </div>
                            </div>
                        </div>  

                        <div class="action-bar-bottom">
                           <button class="btn-main delay4" @click=${(e) => this.btnLogout(e)}>Deslogar</button> 
                           <button class="delay5" @click=${(e) => this.btnEnviarNovaSenhaUser()}>Trocar senha</button>
                        </div>
                     </div>                         
                        ` : null}

                 ${this.loginInfo === null ? html`
                             <form onsubmit=${(e) => this.btnLogin(e)}>
                                <div class="col-1">
                                    <div>
                                        <label>Seu email:</label>
                                        <input type="email" class="textForm delay1" id="inputEmail" />
                                    </div>
                                    <div>
                                        <label>Senha:</label>
                                        <input-password name="inputSenha" class="delay2" id="inputSenha" value="" />
                                    </div>
                                </div>    

                                <div class="col-1">
                                    <div class="text-mini">
                                            Este site está protegido pelo reCAPTCHA e pela <a href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noreferrer">Política de Privacidade</a> e a aplicação dos <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer"> Termos de Serviço</a> do Google.
                                        </div>
                                </div>

                                <div class="action-bar-bottom">
                                  <input type="submit" class="btn-main delay4" value="Autenticar" /> <button class="btn-main delay4" @click=${(e) => this.btnEnviarNovaSenha(e)}>Esqueci a senha</button>  
                                </div>
                         </form>
                          ` : null}
            ` : null}


              ${this.modeView === "resetpassword" ? html`
                <form onsubmit=${(e) => this.resetPassword(e)}>
                    <div class="col-1">
                        <div>
                            <label>Nova senha:</label>
                            <input-password name="inputNewPassword" id="inputNewPassword" value="" />
                        </div>
                    </div>    

                    <div class="col-1">
                        <div class="text-mini">
                                Este site está protegido pelo reCAPTCHA e pela <a href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noreferrer">Política de Privacidade</a> e a aplicação dos <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer"> Termos de Serviço</a> do Google.
                            </div>
                    </div>

                    <div class="action-bar-bottom">
                        <input type="submit" class="btn-main delay4" value="Enviar" /> 
                    </div>
                </form>
            ` : null}


         `);
    }
}

window.customElements.define("app-login", AppLogin);