import { Hole, html, render } from "uhtml";
import { Base } from "./base";
import { store } from "../service/store.service";
import { uuidv4 } from "../lib/uuidv4";
import { localISOString } from "../lib/treatments";
import { showConfirm, showPopup } from "../lib/message.lib";
import { screens, stores } from "../service/config.service";
import { swapScreen } from "../lib/screens.lib";

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

    showSelecionarItem() {

        this.pesoInicial = this.props.item.peso > 800 ? 100 : this.props.item.peso;

        showPopup(html`<div class=''>
                        <div class='title'>${this.props.item.nome}</div>
                        <h3 class='text'>Qual foi o peso?</h3>
                            <div class='info'>
                                <input type='number' id='intPesoAlimento' 
                                        class='input-number' 
                                        value=${this.pesoInicial}
                                        placeholder='peso em gramas'
                                        oninput=${(e) => this.calcularAlimento(e.currentTarget.value)}  />
                                        <div class="text">
                                            <span id="pesoCalorias"></span> calorias e <span id="pesoProteinas"></span>g de proteínas.
                                        </div>
                            </div>
                    </div>`,
            () => this.selecionarItem(),
            () => {
                this.calcularAlimento(this.pesoInicial.toString());
            });


    }

    selecionarItem() {
        let ele: HTMLInputElement = document.querySelector("#intPesoAlimento") as HTMLInputElement;
        let peso: number = parseFloat(ele.value);

        if (this.props.item.id)
            var cardapioItem: CardapioItem | undefined = store.getItemById<CardapioItem>(stores.Cardapio, this.props.item.id);

        if (cardapioItem) {

            let calorias: number = Math.round((peso * cardapioItem.calorias) / cardapioItem.peso);
            let proteinas: number = Math.round((peso * cardapioItem.proteinas) / cardapioItem.peso);

            let itemAlimentacao: RegistroRefeicaoItem = {
                "id": uuidv4(),
                "nome": cardapioItem.nome,
                "tipo": cardapioItem.tipo,
                "calorias": calorias,
                "proteinas": proteinas,
                "peso": peso,
                "created": localISOString()
            }

            store.addItem<RegistroRefeicaoItem>(stores.RegistroRefeicao, itemAlimentacao).then((info) => {
                this.reiniciarAlimentacao();
            });
        }
    }

    reiniciarAlimentacao() {
        this.render();
    }

    removerItemCardapio() {

        if (this.props.item.id) {
            showConfirm("Você tem certeza que deseja remover este item do seu cardário?", () => {
                if (this.props.item.id)
                    store.removeItemById(stores.Cardapio, this.props.item.id);
            })
        }
    }

    editarItemCardapio() {

        if (this.props.item.id) {

            let ingredientes: Ingrediente[] = [];

            for (let i = 0; i < this.props.item.ingredientes.length; i++) {
                ingredientes.push({
                    "nome": this.props.item.ingredientes[i].nome,
                    "calorias": this.props.item.ingredientes[i].calorias,
                    "proteinas": this.props.item.ingredientes[i].proteinas,
                    "idProduto": this.props.item.ingredientes[i].idProduto,
                    "peso": this.props.item.ingredientes[i].peso,
                    "unidade": this.props.item.ingredientes[i].unidade,
                    "unidAltDesc": this.props.item.ingredientes[i].unidAltDesc,
                    "unidAltPeso": this.props.item.ingredientes[i].unidAltPeso,
                    "id": this.props.item.ingredientes[i].id
                });

            }

            store.replaceBatch([{ storeName: stores.Ingrediente, items: ingredientes }]);
            store.editStart(stores.Cardapio, this.props.item);

            swapScreen(screens.Calculadora);
        }
    }

    render() {

        this.props = {
            idx: parseInt(this.p("idx")),
            item: JSON.parse(this.p("item"))
        }

        //Remove os itens "deleted"
        this.props.item.ingredientes = this.props.item.ingredientes.filter((i) => {
            return i.deleted === undefined || i.deleted === null;
        });


        render(this, html`
                <div class='listItem cardapio delay'>
                   <div class='title'>${this.props.item.nome}</div>
                        ${this.props.item.ingredientes.map((item, idx) => {

            var peso = item.peso === undefined || item.peso === null ? "100" : item.peso;
            var unidade = item.unidade === null || item.unidade === undefined ? "g" : item.unidade;
            let unidAltPeso = Math.round(item.peso / item.unidAltPeso);

            return html`<div class='list mini'>
                                        <div class='item mini'>
                                                <span> ${peso}${unidade} </span> ${item.unidAltPeso > 0 ? html`/ <span>${unidAltPeso}</span> ${item.unidAltDesc.toLowerCase()}` : null} de ${item.nome} 
                                        </div>
                                    </div>` })}
                        
                <div class='total'> Total de <span> ${this.props.item.peso}g</span>, <span>${this.props.item.calorias} calorias </span> e <span> ${this.props.item.proteinas}g de proteínas</span>.</div>
                <div class='actions right'>
                    <div class="btn-trash" title="Remover" @click=${() => this.removerItemCardapio()}></div>
                    <div class="btn-edit" title="Editar" @click=${() => this.editarItemCardapio()}></div>
                </div>
                <div class='actions center'>
                    <button class='btn-selecionar' onclick=${() => this.showSelecionarItem()}> Consumi este alimento </button>
                </div>
                </div>`);
    }
}

window.customElements.define("app-cardapio-item", AppCardapioItem);