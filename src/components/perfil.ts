import { html, render } from "uhtml";
import { Base } from "./base";
import { screens, stores } from "../service/config.service";
import { setNumberField, setRadiosCheck } from "../lib/forms";
import { store } from "../service/store.service";
import { calcularMetaDiaria } from "../service/meta-diaria.service";
import { swapScreen } from "../lib/screens.lib";


class AppPerfil extends Base implements IAppPerfil {

    constructor() {
        super();
    }

    boxResumo: any = null;

    save(): void {
        calcularMetaDiaria();
    }

    connectedCallback() {

        store.onUpdatedItem(stores.Perfil, (e: CustomEventInit) => {
            this.showMetaDiaria(e.detail.item as Perfil);
        });

        store.onAddedItem(stores.Perfil, (e: CustomEventInit) => {
            this.showMetaDiaria(e.detail.item as Perfil);

            let cardapioItems = store.getItems(stores.Cardapio);
            if (cardapioItems.length === 0) {
                swapScreen(screens.Calculadora);
            }
        });

        store.onReplacedAll((e: CustomEventInit) => {
            this.getPerfil();
        });

        this.getPerfil();
    }

    getPerfil() {
        let item: Perfil | null = store.getSingle<Perfil>(stores.Perfil);
        if (item !== null) {
            this.showMetaDiaria(item);
        } else {
            this.render();
        }
    }

    showMetaDiaria(resultado: Perfil) {

        this.boxResumo = html`<app-perfil-resumo resultado=${JSON.stringify(resultado)} />`

        this.render();

        setRadiosCheck("inputGenero", resultado.genero);
        setRadiosCheck("inputAtividadeFisica", resultado.atividadeFisica);
        setNumberField("inputPeso", resultado.peso);
        setNumberField("inputAltura", resultado.altura);
        setNumberField("inputIdade", resultado.idade);
        setRadiosCheck("inputObjetivo", resultado.objetivo);
    }

    render() {
        render(this, html` 
            <div class="form form-bar-bottom">
              
                ${this.boxResumo}
                <div class="col-2">
                    <div>
                        <label>Digite a sua idade:</label>
                        <input type="number" class="textForm delay1" id="inputIdade" />
                    </div>
                    <div>
                        <label>Digite o seu peso:</label>
                        <input type="number" class="textForm delay2" id="inputPeso" />
                        <div class="descricao">Em quilogramas.</div>
                    </div>
                    <div>
                        <label>Digite a sua altura:</label>
                        <input type="text" class="delay3" pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]" id="inputAltura" />
                        <div class="descricao">Em centímetros.</div>
                    </div>
                    <div>
                        <label>Seu gênero:</label>
                        <div class="radio-group">
                            <div class="radio">
                                <input type="radio" name="inputGenero" value="M" /> <span class="delay4">Masculino</span>
                            </div>
                            <div class="radio">
                                <input type="radio" name="inputGenero" value="F" /> <span class="delay5">Feminino</span>
                            </div>
                         </div>
                    </div>
                </div>
                <div class="col-2">
                    <div>
                        <label>Seu objetivo:</label>
                        <div class="radio-group">
                            <div class="radio">
                                <input type="radio" name="inputObjetivo" value="MM" /> <span class="delay6">Ganhar massa magra</span>
                            </div>
                            <div class="radio">
                                <input type="radio" name="inputObjetivo" value="PP" /> <span class="delay7">Perder peso</span>
                            </div>
                        </div>
                    </div>
                  
                    <div>
                        <label>Nível de atividade física:</label>
                        <div class="radio-group">
                            <div class="radio">
                                <input type="radio" name="inputAtividadeFisica" value="1" /> <span class="delay8">Sedentário</span>
                            </div>
                            <div class="radio">
                                <input type="radio" name="inputAtividadeFisica" value="2" /> <span class="delay9">Ativo </span>
                            </div>
                            <div class="radio">
                                <input type="radio" name="inputAtividadeFisica" value="3" /> <span class="delay10">Muito ativo </span>
                            </div>
                        </div>
                    </div>
                </div>
        
            </div>
           `);
    }
}

window.customElements.define("app-perfil", AppPerfil);