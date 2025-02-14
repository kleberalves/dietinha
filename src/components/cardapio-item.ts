import { Hole, html, render } from "uhtml";
import { Base } from "./Base";
import { store } from "../service/store.service";
import { ALIMENTACAO_STORE, CARDAPIO_STORE } from "../app";
import { showConfirm } from "../service/message.service";
import { uuidv4 } from "../lib/uuidv4";

class AppCardapioItem extends Base {

    props: {
        idx: number;
        id: string;
        peso: number;
        calorias: number;
        proteinas: number;
        nome: string;
        itens: any[];
    }

    list: CardapioItem[] = [];
    templateSelecao: Hole = null;
    proteinas: number = 0;
    calorias: number = 0;
    pesoInicial: number = 0;

    constructor() {
        super();

        store.onAddedItem(CARDAPIO_STORE, (e: CustomEventInit) => {
            this.list = e.detail.items;
            this.render();
        });

        store.onRemovedItem(CARDAPIO_STORE, (e: CustomEventInit) => {
            this.list = e.detail.items;
            this.render();
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id"),
            nome: this.p("nome"),
            itens: JSON.parse(this.p("itens")),
            proteinas: this.p("proteinas"),
            calorias: this.p("calorias"),
            peso: this.p("peso")
        }

        //Se for maior que 800gr, sugere 100g a porção.
        this.pesoInicial = this.props.peso > 800 ? 100 : this.props.peso;
        this.calculaNutrientes(this.pesoInicial);

        this.render();
    }

    calculaNutrientes(peso: number) {
        this.calorias = Math.round(peso * this.props.calorias / this.props.peso);
        this.proteinas = Math.round(peso * this.props.proteinas / this.props.peso);
    }

    calcularAlimento(value: string) {
        this.calculaNutrientes(parseFloat(value));
        this.templateSelecao = this.getTemplateSelecao();

        this.render();
    }

    selecionarItem() {
        this.templateSelecao = this.getTemplateSelecao();

        this.render();
    }

    reiniciarAlimentacao() {
        this.templateSelecao = null;
        this.render();
    }

    registrarAlimentacao() {

        let ele: HTMLInputElement = this.querySelector("#intPesoAlimento") as HTMLInputElement;
        let peso: number = parseFloat(ele.value);

        var cardapioItem: CardapioItem | undefined = store.getItemById<CardapioItem>(CARDAPIO_STORE, this.props.id);

        if (cardapioItem) {

            let calorias: number = Math.round((peso * cardapioItem.calorias) / cardapioItem.peso);
            let proteinas: number = Math.round((peso * cardapioItem.proteinas) / cardapioItem.peso);

            let itemAlimentacao = {
                "id": uuidv4(),
                "idCardapio": cardapioItem.id,
                "nome": cardapioItem.nome,
                "tipo": cardapioItem.tipo,
                "calorias": calorias,
                "proteinas": proteinas,
                "peso": peso,
                "created": new Date()
            }

            store.addItem(ALIMENTACAO_STORE, itemAlimentacao).then((info) => {
                this.reiniciarAlimentacao();
            });
        }
    }

    removerItemCardapio() {

        showConfirm("Você tem certeza que deseja remover este item do seu cardário?", () => {
            store.removeItemById(CARDAPIO_STORE, this.props.id);
        })
    }

    getTemplateSelecao() {
        return html`     
                <style>
                .box-selecionar {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }
                .box-selecionar .info {
                    margin-bottom: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .box-selecionar .actions.center {
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-evenly;
                    width: 100%;
                }
            </style>
    
            <div class='box-selecionar'>
                <h3 class=''>Qual foi o peso?</h3>
                    <div class='info'>
                            <input type='number' id='intPesoAlimento' 
                                    style='width: 100px;height: 40px;margin-bottom: 15px;'
                                    class='' 
                                    value=${this.pesoInicial}
                                    placeholder='peso em gramas'
                                    oninput=${(e) => this.calcularAlimento(e.currentTarget.value)}  />
                                    <div class="anime">
                                        <span>${this.calorias}</span> calorias e <span>${this.proteinas}g</span> proteínas.
                                    </div>
                    </div>
                    <div class='actions center'>
                        <button class='btn-selecionar' class="" onclick=${() => this.registrarAlimentacao()}>Salvar</button>
                        <button class='btn-cancelar' class="" onclick=${() => this.reiniciarAlimentacao()}>Cancelar</button>
                    </div>
            </div>`;
    }

    render() {
        render(this, html`
                <div class='listItem cardapio delay'>
                   <div class='title'>${this.props.nome}</div>
                        ${this.props.itens.map((item, idx) => {
            var peso = item.peso === undefined ? "100" : item.peso;
            var unidade = item.unidade === undefined ? "g" : item.unidade;
            return html`<div class='list mini'>
                        <div class='item mini'>
                                - <span> ${peso}  ${unidade} </span> de ${item.nome}
                        </div>
                    </div>` })}
                        
                <div class='total'> Total de <span> ${this.props.peso} g</span>, <span>${this.props.calorias} calorias </span> e <span> ${this.props.proteinas}g de proteínas</span>.</div>
                <div class='actions right'>
                    <div class="btn-trash" @click=${() => this.removerItemCardapio()}></div>
                </div>
                <div class='actions center'>
                    ${this.templateSelecao === null ? html`<button class='btn-selecionar' onclick=${() => this.selecionarItem()}> Comi este alimento </button>` : html``}
                    ${this.templateSelecao}
                </div>
                </div>`);
    }
}

window.customElements.define("app-cardapio-item", AppCardapioItem);