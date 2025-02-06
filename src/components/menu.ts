import { render, html, Hole } from 'uhtml';

class Menu extends HTMLElement {
    shadow: ShadowRoot;
    private itemsLst: string[] = [];

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "closed" });
    }

    addItem(item: string) {
        this.itemsLst.push(item);
        console.log(this.itemsLst)

        this.render();
    }

    connectedCallback() {
        this.setAttribute('role', 'listbox');

        let itemsAttr = this.getAttribute("items");
        if (itemsAttr !== null && itemsAttr !== undefined) {
            this.itemsLst = JSON.parse(itemsAttr);
        }

        this.render();
    }

    render() {

        let itemsTemplate: Hole[] = [];

        for (let i = 0; i < this.itemsLst.length; i++) {
            itemsTemplate.push(html`<ipp-menu-item>${this.itemsLst[i]}</ipp-menu-item>`);
        }

        render(this.shadow, () => html` 
          <style>
          :host {
            display: flex;
            contain: content;
            overflow-x: hidden;
            overflow-y: auto;
            border-radius: 10px;
            max-width: 200px;
            padding: 10px;
            margin: 10px;
            margin-top: 10px;
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
            flex-direction: column;
          }
        </style>
        ${itemsTemplate.map(value => {
            return value;
        })}
        <slot>
        </slot>
      `);
    }
}

window.customElements.define("ipp-menu", Menu);