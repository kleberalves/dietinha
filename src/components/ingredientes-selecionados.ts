import { html, render } from "uhtml";
import { Base } from "./base";
import { store } from "../service/store.service";
import { stores } from "../service/config.service";
import { removerIngredienteCardapioItem, salvarItemCardapio, somaMacros } from "../service/cardapio.service";

class IngredientesSelecionados extends Base implements IIngredientesSelecionados {

    props: {
        idx: number;
        id: number;
    }

    listaIngredientes: Ingrediente[] = [];
    listaCardapio: CardapioItem[] = [];
    cardapioItemEdit: CardapioItem | null = null;

    constructor() {
        super();
    }

    salvarItemCardapio() {
        salvarItemCardapio(this.listaIngredientes, this.cardapioItemEdit);
    }

    //Declara os eventos como Arrow Functions pois Functions normais coibem o acesso ao "this".
    onEditStarted = (e: CustomEventInit) => {

        if (e.detail !== null && e.detail.store === stores.Cardapio) {
            this.cardapioItemEdit = e.detail.itemRef;
            this.render();
        }
    }

    onEditFinished = (e: CustomEventInit) => {

        this.cardapioItemEdit = null;
        store.clear(stores.Ingrediente);
        this.render();

        store.removeEditEvents(this.onEditStarted, this.onEditFinished);
        store.removeOnCleared(this.onCleared);
        store.removeOnAddedItem(this.onAddedItem);
        store.removeOnRemovedItem(this.onRemovedItem);
    }

    onCleared = (e: CustomEventInit) => {

        if (e.detail.store === stores.Ingrediente) {
            this.listaIngredientes = [];
            render(this, html``);
        }
    };

    onAddedItem = (e: CustomEventInit) => {

        if (e.detail.store === stores.Ingrediente) {
            this.listaIngredientes = e.detail.items;
            this.render();
        }
    };

    onRemovedItem = (e: CustomEventInit) => {

        if (e.detail.store === stores.Ingrediente) {
            if (e.detail.items.length === 0) {
                store.editFinish();

            } else {
                this.listaIngredientes = e.detail.items;
                if (this.cardapioItemEdit) {
                    removerIngredienteCardapioItem(this.cardapioItemEdit, e.detail.item.id);
                }
            }

            this.render();

        }
    }

    onChangedIngredienteAssistente = (e: CustomEventInit) => {
        if (e.detail.store === stores.IngredienteAssistente) {
            this.listaIngredientes = e.detail.items;
            this.render();
        }
    };

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id")
        }

        //Modo calculadora
        this.listaIngredientes = store.getItems(stores.Ingrediente);
        store.onEditStarted(this.onEditStarted);
        store.onEditFinished(this.onEditFinished);
        store.onCleared(this.onCleared);
        store.onAddedItem(this.onAddedItem);
        store.onRemovedItem(this.onRemovedItem);

        store.editCheck();

        this.listaCardapio = store.getItems(stores.Cardapio);

        this.render();
    }

    render() {

        if (!this.listaIngredientes) {
            return;
        }

        //Ordenar por categoria crescente
        this.listaIngredientes = this.listaIngredientes.sort((a, b) => {

            if (a.categoria && b.categoria) {
                return a.categoria < b.categoria ? -1 : 1
            }

            return 0
        })

        let result = somaMacros(this.listaIngredientes, "normal");

        render(this, html`<div class='list selecionados'>
                    <div class='title'>Ingredientes selecionados (${result.items.length})</div>

                    ${this.cardapioItemEdit !== null ? html`<div class="msg-warning">Você está editando um item do cardápio.</div>` : null}
                    ${(this.listaCardapio.length === 0
                && this.listaIngredientes.length === 1) ? html` <wizard-message title="Dica">
                                                            Faça uma outra consulta e adicione novos ingredientes para compor a sua refeição. <br/>
                                                                Exemplo: Arroz cozido, Feijão preto cozido, Ovo de galinha inteiro cozido e Batata inglesa cozida.
                                                        </wizard-message>` : null}
                        <div class="list-space-around">
                            ${result.items.map(item => item)}
                        </div>
                        <div class='cols total'>
                            <div>Calorias <span class='text'> ${result.totalCalorias} </span></div>
                            <div>Proteínas <span class='text'>${result.totalProteinas} </span></div>
                            <div>Peso <span class='text'>${result.totalPeso}g</span></div>
                        </div>
                            ${(this.listaCardapio.length === 0 && this.listaIngredientes.length > 1) ? html`<wizard-message title="Dica">
                                    Após selecionar os ingredientes da refeição, selecione a categoria adequada e clique em <b>"Adicionar ao cardápio"</b>.
                                </wizard-message>` : null}
                        <div class='cols bar-add-ingredientes'>
                            <div class='radio-col-2'>
                                <div class='radio'><input type="radio" name="inputTipoCardapio" value="CA" /> <span>Café da manhã/tarde</span> </div>
                                <div class='radio'><input type="radio" name="inputTipoCardapio" value="AJ" /> <span>Almoço/Jantar</span> </div>
                                <div class='radio'><input type="radio" name="inputTipoCardapio" value="LC" /> <span>Lanches</span> </div>
                                <div class='radio'><input type="radio" name="inputTipoCardapio" value="SM" /> <span>Sobremesas</span> </div>
                        </div>
                    </div>
                </div>`);

    }


}

window.customElements.define("app-ingredientes-selecionados", IngredientesSelecionados);