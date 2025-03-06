import { Hole, html, render } from "uhtml";
import { Base } from "./base";
import { showConfirm } from "../lib/message.lib";
import { store } from "../service/store.service";
import { ALIMENTACAO_STORE } from "../service/config.service";
import { formatDate } from "../lib/treatments";

class RegistroAlimentosItem extends Base {

    constructor() {
        super();
    }

    refeicaoDia: RefeicaoDia;

    connectedCallback() {
        this.refeicaoDia = JSON.parse(this.p("refeicao-dia"));
        this.render();
    }

    removerItemCardapio(id: string) {
        showConfirm("Você tem certeza que deseja remover este item do seu registro diário?", () => {
            store.removeItemById(ALIMENTACAO_STORE, id);
        })
    }

    render() {

        var totalCalorias = 0;
        var totalProteinas = 0;
        var totalPeso = 0;

        let itemsShow: Hole[] = [];

        for (var i = 0; i < this.refeicaoDia.registros.length; i++) {
            var itemCalculo = this.refeicaoDia.registros[i];
            let itemIdCalculo = this.refeicaoDia.registros[i].id;

            itemsShow.push(html`
                <div class='listItem cardapio delay'>
                    <div class='title'>${itemCalculo.nome}</div>
                    <div class='total'> Total de <span> ${itemCalculo.peso}g</span>, <span>${itemCalculo.calorias} calorias </span> e <span> ${itemCalculo.proteinas}g de proteínas</span>.</div>
                
                    <div class="hora">${formatDate(itemCalculo.created, "hh:MM")}</div>

                    <div class='actions right'>
                        <div class="btn-trash" @click=${() => this.removerItemCardapio(itemIdCalculo)}></div>
                    </div>
                </div>`);

            totalCalorias += itemCalculo.calorias;
            totalProteinas += itemCalculo.proteinas;
            totalPeso += itemCalculo.peso;
            
        }


        render(this, html`<div class="data">${formatDate(this.refeicaoDia.dia, "dd/mm")}</div> ${itemsShow.length === 0 ?
            html`<b class="info-none"> Você ainda não registrou nenhuma refeição hoje.</b>`
            : html` <div class='cols total'>
                        <div>Total de calorias<span class='text'>${totalCalorias}</span></div>
                        <div>Proteínas<span class='text'>${totalProteinas}</span></div>
                        <div>Volume <span class='text'>${totalPeso}g </span></div>
                    </div>
                    <div class="list-space-around">
                        ${itemsShow.map(item => item)}
                    </div>
                    `}
           `);

    }
}

window.customElements.define("app-registro-alimentos-item", RegistroAlimentosItem);