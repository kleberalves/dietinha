//

import { html, render } from "uhtml";
import { Base } from "./base";
import { getLoginInfo, login, logout } from "../service/login.service";
import { store } from "../service/store.service";
import { stores } from "../service/config.service";
import { formatDate } from "../lib/treatments";
import { sync } from "../service/sync.service";


class AppLogin extends Base {

    items: CardapioItem[] = [];
    itemsView: CardapioItem[] = [];
    showSearch: boolean = false;
    loginInfo: AuthInfo | null;

    constructor() {
        super();
    }

    connectedCallback() {

        this.loadInfoLogin();

        store.onCleared(stores.Login, (e: CustomEventInit) => {
            this.loginInfo = null;
            this.render();
        });
    }

    loadInfoLogin() {
        this.loginInfo = getLoginInfo();
        this.render();
    }

    btnLogout(element: HTMLButtonElement) {
        logout();
    }

    btnLogin(e: SubmitEvent) {
        e.preventDefault();

        login().then(() => {
            
            this.loadInfoLogin();
            sync();

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
                               <div class="text-mini">
                                     ${this.loginInfo.created ? formatDate(this.loginInfo.created, "dd/mm hh:MM") : null}
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