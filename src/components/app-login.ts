//

import { html, render } from "uhtml";
import { Base } from "./base";
import { login } from "../service/login.service";
import { store } from "../service/store.service";
import { CARDAPIO_STORE, CONFIG_STORE, INGREDIENTES_STORE, LOGIN_STORE, PERFIL_STORE, REGISTRO_REFEICAO_STORE } from "../service/config.service";
import { formatDate } from "../lib/treatments";
import { sync } from "../service/sync.service";

interface LoginInfo {
    name?: string;
    email: string;
    token?: string;
    created: string;
}

class AppLogin extends Base {

    items: CardapioItem[] = [];
    itemsView: CardapioItem[] = [];
    showSearch: boolean = false;
    loginInfo: LoginInfo | null;

    constructor() {
        super();
    }

    connectedCallback() {

        this.loadInfoLogin();
    }

    loadInfoLogin() {
        this.loginInfo = store.getSingle<LoginInfo>(LOGIN_STORE);
        this.render();
    }

    btnLogout(element: HTMLButtonElement) {
        store.clear(LOGIN_STORE);
        store.clear(CONFIG_STORE);
        store.clear(INGREDIENTES_STORE);
        store.clear(CARDAPIO_STORE);
        store.clear(REGISTRO_REFEICAO_STORE);
        store.clear(PERFIL_STORE);
        this.loginInfo = null;
        this.render();
    }

    btnLogin(e: SubmitEvent) {
        e.preventDefault();

        login().then(() => {
            this.loadInfoLogin();

            sync().then(() => {
            }).catch((e) => {
                console.log(e);
            }).finally(() => {
            });

        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        render(this, html`
             
                ${this.loginInfo !== null ? html`
                     <div class="form">
                        <div class="col-1">
                            <div>
                                <label>${this.loginInfo.email}</label>
                                <br/>
                               <div class="text-mini">
                                     ${formatDate(this.loginInfo.created, "dd/mm hh:MM")}
                                </div>
                            </div>
                        </div>  

                        <div class="action-bar-bottom">
                        <button class="btn-main delay4" @click=${(e) => this.btnLogout(e)}>Deslogar</button> 
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
                                        <input type="password" class="textForm delay2" id="inputSenha" />
                                    </div>
                                </div>    

                                <div class="col-1">
                                    <div class="text-mini">
                                            Este site está protegido pelo reCAPTCHA e pela <a href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noreferrer">Política de Privacidade</a> e a aplicação dos <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer"> Termos de Serviço</a> do Google.
                                        </div>
                                </div>
                                

                                <div class="col-1">
                                    <input type="submit" class="btn-main delay4" value="Autenticar" />
                                </div>  
                         </form>
                          ` : null}

            
         
            `);
    }
}

window.customElements.define("app-login", AppLogin);