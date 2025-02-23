import { html, render } from "uhtml";
import { adicionarCalculo, calcularAlimentoColher as calcularAlimentoUnidade, calcularAlimentoPeso } from "../service/calculo.service";
import { Base } from "./Base";

class PesquisaItem extends Base {

    props: any;

    constructor() {
        super();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }

    checkName(value: string) {
        if (this.props.nome.toLowerCase().indexOf(value) > -1) {
            return true;
        }

        return false;
    }

    connectedCallback() {

        this.props = {
            idx: this.p("idx"),
            id: this.p("id"),
            nome: this.p("nome"),
            unidade: this.p("unidade"),
            peso: this.p("peso"),
            calorias: this.p("calorias"),
            categoria: this.p("categoria")
        }

        var className = `listItem pesquisa-alimento-item filtro delay${this.props.idx}`;
        var idItemResultadoCalorias = `itemResultadoCalorias${this.props.idx}`
        var idItemResultadoProteinas = `itemResultadoProteinas${this.props.idx}`
        var inputPeso = `inputPeso${this.props.idx}`;
        var inputQuantidade = `inputQuantidade${this.props.idx}`;
        var unidade: string = this.props.unidade ? this.props.unidade : "g";

        let rating:number = 30;
        let label:string = "Colher de sopa";

        if(this.checkName("ovo") && this.checkName("galinha")){
            rating = 45;
            label = "Ovo unidade";
        } else   if(this.checkName("pão") && this.checkName("forma")){
            rating = 25;
            label = "Fatia";
        } else  if(this.checkName("ovo") && this.checkName("codorna")){
            rating = 10;
            label = "Unidade";
        }

        render(this, html`
            <link rel="stylesheet" href="css/animations.delay.css" crossorigin="" />

        <div class=${className}>
            <div class='title'> ${this.props.nome} <div><span>${this.props.calorias}</span> cal por <span> 100 ${unidade}</span></div></div> 
            <div class='actions pesquisa-alimento-item-actions'>
                
                <div> <b>Peso em gramas</b>
                    <input type='number' id=${inputPeso} style='width: 85px;height: 40px;' placeholder='peso' 
                        oninput=${(e) => calcularAlimentoPeso(e.currentTarget.value, this.props.idx, this.props.id, rating)} />
                </div>

                <div> <b>${label}</b>
                    <input type='number' id=${inputQuantidade} style='width: 85px;height: 40px;' placeholder=${label} 
                        oninput=${(e) => calcularAlimentoUnidade(e.currentTarget.value, this.props.idx, this.props.id, rating)} />    
                </div>

                <div class='action'><b>Calorias</b><div id=${idItemResultadoCalorias}>-</div></div>
                <div class='action'><b>Proteínas</b><div id=${idItemResultadoProteinas}>-</div></div>
                <button class='btn-selecionar' onclick=${() => adicionarCalculo(this.props.idx, this.props.id)}> Selecionar </button>
            </div>
        </div>
        
        `);
    }
}

window.customElements.define("app-pesquisa-alimento-item", PesquisaItem);