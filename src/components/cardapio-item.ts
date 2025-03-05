import { Hole, html, render } from "uhtml";
import { Base } from "./Base";
import { store } from "../service/store.service";
import { ALIMENTACAO_STORE, CARDAPIO_STORE } from "../service/config.service";
import { uuidv4 } from "../lib/uuidv4";
import { localISOString } from "../lib/treatments";
import { showConfirm, showPopup } from "../lib/message.lib";

class AppCardapioItem extends Base {

    props: {
        idx: number;
        item: CardapioItem;
    }

    proteinas: number = 0;
    calorias: number = 0;
    pesoInicial: number = 0;

    constructor() {
        super();
    }

    attributeChangedCallback(name, oldValue, newValue) {

        if (oldValue !== null) {
            this.render();
        }
    }

    static get observedAttributes() {
        return ['item', 'idx'];
    }

    connectedCallback() {
        this.render();
    }

    calcularAlimento(value: string) {
        let pesoCalorias = document.querySelector<HTMLSpanElement>("#pesoCalorias");
        if (pesoCalorias) {
            pesoCalorias.innerText = Math.round(parseFloat(value) * this.props.item.calorias / this.props.item.peso).toString();
        }

        let pesoProteinas = document.querySelector<HTMLSpanElement>("#pesoProteinas");
        if (pesoProteinas) {
            pesoProteinas.innerText = Math.round(parseFloat(value) * this.props.item.proteinas / this.props.item.peso).toString();
        }
    }

    selecionarItem() {

        this.pesoInicial = this.props.item.peso > 800 ? 100 : this.props.item.peso;

        showPopup(html`<div class=''>
                        <div class='title'>${this.props.item.nome}</div>
                        <h3 class=''>Qual foi o peso?</h3>
                            <div class='info'>
                                <input type='number' id='intPesoAlimento' 
                                        style='width: 100px;height: 40px;margin-bottom: 15px;'
                                        class='' 
                                        value=${this.pesoInicial}
                                        placeholder='peso em gramas'
                                        oninput=${(e) => this.calcularAlimento(e.currentTarget.value)}  />
                                        <div class="anime">
                                            <span id="pesoCalorias"></span> calorias e <span id="pesoProteinas"></span>g de proteínas.
                                        </div>
                            </div>
                    </div>`,
            () => {

                let ele: HTMLInputElement = document.querySelector("#intPesoAlimento") as HTMLInputElement;
                let peso: number = parseFloat(ele.value);

                var cardapioItem: CardapioItem | undefined = store.getItemById<CardapioItem>(CARDAPIO_STORE, this.props.item.id);

                if (cardapioItem) {

                    let calorias: number = Math.round((peso * cardapioItem.calorias) / cardapioItem.peso);
                    let proteinas: number = Math.round((peso * cardapioItem.proteinas) / cardapioItem.peso);

                    let itemAlimentacao: RegistroRefeicao = {
                        "id": uuidv4(),
                        "idCardapio": cardapioItem.id,
                        "nome": cardapioItem.nome,
                        "tipo": cardapioItem.tipo,
                        "calorias": calorias,
                        "proteinas": proteinas,
                        "peso": peso,
                        "created": localISOString()
                    }

                    store.addItem(ALIMENTACAO_STORE, itemAlimentacao).then((info) => {
                        this.reiniciarAlimentacao();
                    });
                }
            },
            () => {
                this.calcularAlimento(this.pesoInicial.toString());
            });

     
    }

    reiniciarAlimentacao() {
        this.render();
    }

    removerItemCardapio() {

        showConfirm("Você tem certeza que deseja remover este item do seu cardário?", () => {
            store.removeItemById(CARDAPIO_STORE, this.props.item.id);
        })
    }

    render() {

        this.props = {
            idx: JSON.parse(this.p("idx")),
            item: JSON.parse(this.p("item"))
        }

        render(this, html`
                <div class='listItem cardapio delay'>
                   <div class='title'>${this.props.item.nome}</div>
                        ${this.props.item.itens.map((item, idx) => {
            var peso = item.peso === undefined ? "100" : item.peso;
            var unidade = item.unidade === undefined ? "g" : item.unidade;
            return html`<div class='list mini'>
                        <div class='item mini'>
                                <span> ${peso}${unidade} </span> de ${item.nome}
                        </div>
                    </div>` })}
                        
                <div class='total'> Total de <span> ${this.props.item.peso}g</span>, <span>${this.props.item.calorias} calorias </span> e <span> ${this.props.item.proteinas}g de proteínas</span>.</div>
                <div class='actions right'>
                    <div class="btn-trash" @click=${() => this.removerItemCardapio()}></div>
                </div>
                <div class='actions center'>
                    <button class='btn-selecionar' onclick=${() => this.selecionarItem()}> Consumi este alimento </button>
                </div>
                </div>`);
    }
}

window.customElements.define("app-cardapio-item", AppCardapioItem);