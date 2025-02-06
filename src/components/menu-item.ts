import { render, html } from 'uhtml';

class MenuItem extends HTMLElement {

    shadow: ShadowRoot;
    
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
  
      const template = html`
          <style>
            :host {
              border: 0px;
              border-bottom: 1px solid #e9e9e9;
              border-radius: 20px;
              margin-bottom: 2px;
              font-family: Arial;
              font-size: 13px;
              padding: 10px 0px;
              padding-left: 12px;
              cursor: pointer;
            }
            :host:hover{
              opacity: 0.5;
              backgroung-color: #f2f2f2;
            }
          </style>
              <slot>
              </slot>
        `;
  
        render(this.shadow, template);
    }
  }
  
  window.customElements.define("ipp-menu-item", MenuItem);