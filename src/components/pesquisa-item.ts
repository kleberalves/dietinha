import { html, render } from "uhtml";
import { adicionarCalculo, calcularCaloriaProduto } from "../service/calculo.service";
import { Base } from "./Base";

class PesquisaItem extends Base {

    shadow: ShadowRoot;
    props: {
        idx: number;
        id: number;
        cont?: number;
        calorias?: number;
        peso?: number;
        nome?: string,
        unidade?: string,
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {

        this.props = {
            idx: this.getProp("idx"),
            id: this.getProp("id"),
            cont: this.getProp("cont"),
            nome: this.getProp("nome"),
            unidade: this.getProp("unidade"),
            peso: this.getProp("peso")
        }


        var className = `listItem filtro delay${this.props.cont}`;
        var idItemResultadoCalorias = `itemResultadoCalorias${this.props.idx}`
        var idItemResultadoProteinas = `itemResultadoProteinas${this.props.idx}`
        var idItemResultadoPeso = `itemResultadoPeso${this.props.idx}`;

        render(this.shadow, () => html` 
              
            <div class=${className} part="listItem">
            <div class='title' part="title"> ${this.props.nome} <div><span>${this.props.calorias}</span> cal por <span> ${this.props.peso} ${this.props.unidade}</span></div></div> 
            <div class='actions'>
                <input type='number' id=${idItemResultadoPeso} style='width: 85px;height: 40px;' placeholder='peso' oninput=${(e) => calcularCaloriaProduto(this.shadow, e.currentTarget.value, this.props.idx, this.props.id)} />
        
            <div class='action'><b>Calorias</b><div id=${idItemResultadoCalorias}>-</div></div>
            <div class='action'><b>Proteínas</b><div id=${idItemResultadoProteinas}>-</div></div>
        
            <button class='btn-selecionar' onclick=${adicionarCalculo(this.shadow, this.props.idx, this.props.id)}> Selecionar </button></div>
        </div>`);
    }
}

window.customElements.define("ka-pesquisa-item", PesquisaItem);