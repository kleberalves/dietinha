import { Hole, html, render } from "uhtml";
import { Base } from "./base";
import { store } from "../service/store.service";
import { CARDAPIO_STORE, INGREDIENTES_STORE } from "../service/config.service";
import { getRadiosCheck } from "../lib/forms";
import { uuidv4 } from "../lib/uuidv4";
import { showWarning } from "../lib/message.lib";
import { localISOString } from "../lib/treatments";
import { swapScreen } from "../lib/screens.lib";

class IngredientesSelecionados extends Base {

    props: {
        idx: number;
        id: number;
    }

    listaIngredientes: Ingrediente[] = [];
    listaCardapio: CardapioItem[] = [];

    constructor() {
        super();


        store.onAddedItem(INGREDIENTES_STORE, (e: CustomEventInit) => {

            this.listaIngredientes = e.detail.items;
            this.render();
        });

        store.onRemovedItem(INGREDIENTES_STORE, (e: CustomEventInit) => {

            if (e.detail.items.length === 0) {
                this.listaIngredientes = [];
                render(this, html``);
            } else {
                this.listaIngredientes = e.detail.items;
                this.render();
            }
        });

        store.onCleared(INGREDIENTES_STORE, (e: CustomEventInit) => {

            this.listaIngredientes = [];
            render(this, html``);
        });

    }

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id"),
        }

        this.listaIngredientes = store.getItems(INGREDIENTES_STORE);
        this.listaCardapio = store.getItems(CARDAPIO_STORE);

        if (this.listaIngredientes.length > 0) {
            this.render();
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
        <style>
             .selecionados {
                padding-left: 0px;
                padding-right: 0px;
            }
        </style>
        <div class='list selecionados'>
            <div class='title'>Ingredientes selecionados</div>
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

    adicionarItemCardapio() {
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
                    "id": uuidv4(),
                    "nome": nomeItemCardapio,
                    "tipo": tipoItemCardapio,
                    "calorias": totalCalorias,
                    "proteinas": totalProteinas,
                    "peso": totalPeso,
                    "itens": this.listaIngredientes,
                    "created": localISOString()
                }

                store.addItem<CardapioItem>(CARDAPIO_STORE, itemCardapio);

                this.reiniciarListaIngredientes();

                swapScreen("cardapio");
            }
        } catch (e) {
            showWarning(e.message);
        }
    }

    reiniciarListaIngredientes() {
        store.clear(INGREDIENTES_STORE);
    }
}

window.customElements.define("app-ingredientes-selecionados", IngredientesSelecionados);