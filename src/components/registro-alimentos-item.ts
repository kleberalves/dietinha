import { Hole, html, render } from "uhtml";
import { Base } from "./base";
import { showConfirm } from "../lib/message.lib";
import { store } from "../service/store.service";
import { formatDate } from "../lib/treatments";
import { stores } from "../service/config.service";

class RegistroAlimentosItem extends Base {

    constructor() {
        super();
    }

    refeicaoDia: RefeicaoDia;

    connectedCallback() {
        this.refeicaoDia = JSON.parse(this.p("refeicao-dia"));
        this.render();
    }

    removerItemCardapio(id?: string) {
        if (id) {
            showConfirm("Você tem certeza que deseja remover este item do seu registro diário?", () => {
                store.removeItemById(stores.RegistroRefeicao, id);
            })
        }
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
                
                    <div class="hora">${itemCalculo.created ? formatDate(itemCalculo.created, "hh:MM") : null}</div>

                    <div class='actions right'>
                        <div class="btn-trash" @click=${() => this.removerItemCardapio(itemIdCalculo)}></div>
                    </div>
                </div>`);

            totalCalorias += itemCalculo.calorias;
            totalProteinas += itemCalculo.proteinas;
            totalPeso += itemCalculo.peso;

        }


        render(this, html`<div class="data">${formatDate(this.refeicaoDia.dia, "dd/mm")}</div> ${itemsShow.length === 0 ?
            html`<b class="info-none text"> Você ainda não registrou nenhuma refeição hoje.</b>`
            : html` 
                ${this.refeicaoDia.meta ? html`
                    <div class='cols total meta'>
                        <div>
                            <span>Calorias</span> 
                            <div> 
                                <div>Meta diária<span class='text'>${this.refeicaoDia.meta.caloriasMeta}</span></div>
                                <div>Progresso<span class='text'>${this.refeicaoDia.meta.calorias} (${this.refeicaoDia.meta.percentualMeta}%)</span></div>
                            </div>
                        </div>
                        <div>
                             <span>Proteínas</span>
                            <div>  
                                <div>Meta diária<span class='text'>${this.refeicaoDia.meta.proteinasMeta}</span></div>
                                <div>Progresso<span class='text'>${this.refeicaoDia.meta.proteinas} (${this.refeicaoDia.meta.percentualMetaProteinas}%)</span></div>
                            </div>
                      </div>

                    </div>` :
                    html`<div class='cols total'>
                        <div>Calorias<span class='text'>${totalCalorias}</span></div>
                        <div>Proteínas<span class='text'>${totalProteinas}</span></div>
                        <div>Volume <span class='text'>${totalPeso}g </span></div>
                    </div>
`}


                    <div class="list-space-around">
                        ${itemsShow.map(item => item)}
                    </div>
                    `}
           `);

    }
}

window.customElements.define("app-registro-alimentos-item", RegistroAlimentosItem);