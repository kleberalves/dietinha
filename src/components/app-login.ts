//

import { html, render } from "uhtml";
import { Base } from "./base";
import { login } from "../service/login.service";

class AppLogin extends Base {

    items: CardapioItem[] = [];
    itemsView: CardapioItem[] = [];
    showSearch: boolean = false;
    loading: boolean = false;

    constructor() {
        super();
    }

    connectedCallback() {
        console.log("fired");
        this.render();
    }

    btnLogin(element: HTMLButtonElement) {
        element.disabled = true;

        login().then(() => {
            element.disabled = false;
        }).catch((err) => {
            element.disabled = false;
        });
    }

    render() {
        //${this.showSearch ? html`<script src="https://www.google.com/recaptcha/api.js?render=6LcxsKoUAAAAANcv1ELzcW54Yh9SWoLuPMdSdStN"></script>` : null}

        let disabled: string = this.loading ? "disabled" : "";

        render(this, html`

           
              <div class="form">
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
                <button class="btn-main delay4" @click=${(e) => this.btnLogin(e)}>Salvar</button>
            </div>

            
          </div>
            `);
    }
}

window.customElements.define("app-login", AppLogin);