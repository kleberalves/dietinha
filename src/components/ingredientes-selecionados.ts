import { Hole, html, render } from "uhtml";
import { Base } from "./base";
import { store } from "../service/store.service";
import { stores } from "../service/config.service";
import { getRadiosCheck } from "../lib/forms";
import { showWarning } from "../lib/message.lib";
import { localISOString } from "../lib/treatments";
import { swapScreen } from "../lib/screens.lib";
import { sync } from "../service/sync.service";

class IngredientesSelecionados extends Base {

    props: {
        idx: number;
        id: number;
    }

    listaIngredientes: Ingrediente[] = [];
    listaCardapio: CardapioItem[] = [];

    cardapioItemEdit: CardapioItem | null = null;

    constructor() {
        super();



        store.onCleared(stores.Ingrediente, (e: CustomEventInit) => {

            this.listaIngredientes = [];
            render(this, html``);
        });

    }

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id"),
        }

        this.listaIngredientes = store.getItems(stores.Ingrediente);
        this.listaCardapio = store.getItems(stores.Cardapio);

        if (this.listaIngredientes.length > 0) {
            this.render();
        }

        store.onEditStarted((e: CustomEventInit) => {
            if (e.detail.store === stores.Cardapio) {
                this.cardapioItemEdit = e.detail.itemRef;
                this.render();
            }
        });

        store.onEditFinished((e: CustomEventInit) => {
            this.cardapioItemEdit = null;
            store.clear(stores.Ingrediente);
            this.render();
        });

        store.onAddedItem(stores.Ingrediente, (e: CustomEventInit) => {

            this.listaIngredientes = e.detail.items;
            this.render();
        });

        store.onRemovedItem(stores.Ingrediente, (e: CustomEventInit) => {

            if (e.detail.items.length === 0) {
                store.editFinish();

            } else {
                this.listaIngredientes = e.detail.items;
                if (this.cardapioItemEdit) {
                    this.removerIngredienteCardapioItem(this.cardapioItemEdit, e.detail.item.id);
                }
            }

            this.render();
        });

        this.cardapioItemEdit = null;
    }

    removerIngredienteCardapioItem(cardapioItem: CardapioItem, ingredienteId: string) {

        if (cardapioItem)
            for (let i = 0; i < cardapioItem.ingredientes.length; i++) {
                if (cardapioItem.ingredientes[i].id === ingredienteId) {
                    cardapioItem.ingredientes[i].deleted = localISOString();
                    break;
                }
            }

    }

    salvarItemCardapio() {
        try {
            if (this.listaIngredientes.length > 0) {

                var nomeItemCardapio = "";
                var tipoItemCardapio = getRadiosCheck("inputTipoCardapio");

                if (tipoItemCardapio === null) {
                    throw new Error("Selecione o tipo.")
                }
                var totalCalorias = 0;
                var totalProteinas = 0;
                var totalPeso = 0;

                for (var i = 0; i < this.listaIngredientes.length; i++) {
                    var itemCalculo = this.listaIngredientes[i];

                    if (i === 0) {
                        nomeItemCardapio += itemCalculo.nome;
                    } else if (i === this.listaIngredientes.length - 1) {
                        nomeItemCardapio += " e " + itemCalculo.nome.toLowerCase();
                    } else {
                        nomeItemCardapio += ", " + itemCalculo.nome.toLowerCase();
                    }

                    totalCalorias += itemCalculo.calorias;
                    totalProteinas += itemCalculo.proteinas;
                    totalPeso += itemCalculo.peso;
                }

                var itemCardapio: CardapioItem = {
                    "nome": nomeItemCardapio,
                    "tipo": tipoItemCardapio,
                    "calorias": totalCalorias,
                    "proteinas": totalProteinas,
                    "peso": totalPeso,
                    "ingredientes": this.listaIngredientes
                }

                //Se estiver em EDIT MODE, atualiza o ID
                if (this.cardapioItemEdit !== null) {
                    itemCardapio.id = this.cardapioItemEdit.id;
                    itemCardapio.created = this.cardapioItemEdit.created;

                    for (let i = 0; i < this.cardapioItemEdit.ingredientes.length; i++) {

                        let ingrediente = this.cardapioItemEdit.ingredientes[i];
                        let itemFound = itemCardapio.ingredientes.filter((i) => {
                            return i.id === ingrediente.id
                        });

                        if (itemFound.length === 0) {
                            itemCardapio.ingredientes.push(ingrediente);
                        }

                    }
                }

                store.updateCreate<CardapioItem>(stores.Cardapio, itemCardapio);
                store.editFinish();

                sync();

                swapScreen("cardapio");
            }
        } catch (e) {
            showWarning(e.message);
        }
    }

    render() {
        var totalCalorias = 0;
        var totalProteinas = 0;
        var totalPeso = 0;

        let items: Hole[] = [];

        for (var i = 0; i < this.listaIngredientes.length; i++) {
            var itemCalculo = this.listaIngredientes[i];

            items.push(html`<app-ingredientes-selecionados-item 
                                ingrediente=${JSON.stringify(this.listaIngredientes[i])} />`);

            totalCalorias += itemCalculo.calorias;
            totalProteinas += itemCalculo.proteinas;
            totalPeso += itemCalculo.peso;
        }

        render(this, html`
        <div class='list selecionados'>
            <div class='title'>Ingredientes selecionados</div>
            ${this.cardapioItemEdit !== null ? html`<div class="msg-warning">Você está editando um item do cardápio.</div>` : null}
                           ${(this.listaCardapio.length === 0 && this.listaIngredientes.length === 1) ? html`<div class="wizard-message">
                                  <h1>Dica</h1>
                                <p>
                                    Faça uma outra consulta e adicione novos ingredientes para compor a sua refeição. <br/>
                                     Exemplo: Arroz cozido, Feijão preto cozido, Ovo de galinha inteiro cozido e Batata inglesa cozida.
                                </p>

                            </div>` : null}
                <div class="list-space-around">
                    ${items.map(item => item)}
                </div>
            <div class='cols total'>
                <div>Calorias <span class='text'> ${totalCalorias} </span></div>
                <div>Proteínas <span class='text'>${totalProteinas} </span></div>
                <div>Peso <span class='text'>${totalPeso}g</span></div>
            </div>

            ${(this.listaCardapio.length === 0 && this.listaIngredientes.length > 1) ? html`<div class="wizard-message">
                                  <h1>Dica</h1>
                                <p>
                                    Após selecionar os ingredientes da refeição, selecione a categoria adequada e clique em <b>"Adicionar ao cardápio"</b>.
                                </p>
                                
                            </div>` : null}

                            
                <div class='cols bar-add-ingredientes'>
                    <div class='radio-col-2'>
                        <div class='radio'><input type="radio" name="inputTipoCardapio" value="CA" /> <span>Café da manhã/tarde</span> </div>
                        <div class='radio'><input type="radio" name="inputTipoCardapio" value="AJ" /> <span>Almoço/Jantar</span> </div>
                        <div class='radio'><input type="radio" name="inputTipoCardapio" value="LC" /> <span>Lanches</span> </div>
                        <div class='radio'><input type="radio" name="inputTipoCardapio" value="SM" /> <span>Sobremesas</span> </div>
                    </div>
                </div>
        </div>
      `);

    }
}

window.customElements.define("app-ingredientes-selecionados", IngredientesSelecionados);