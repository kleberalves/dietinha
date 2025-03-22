import { parseBool } from "../lib/treatments";
import { Base } from "./base";
import { html, render } from "uhtml";

interface TouchMove {
    startPosX: number;
    startPosY: number;
    endPosX: number;
    endPosY: number;
    direction: string;
}
class AppMiniSlide extends Base {

    constructor() {
        super();
    }

    container: HTMLElement | undefined;

    props: {
        totalSlides: number;
        reverso: boolean;
    };

    currentIndex: number = 0;
    touchMove: TouchMove = {
        startPosX: 0,
        startPosY: 0,
        endPosX: 0,
        endPosY: 0,
        direction: "next"
    };

    currentHeight = 0;

    dotsList: number[] = [];

    REDUCE_HEIGHT: number = 205;

    connectedCallback() {

        this.props = {
            totalSlides: parseInt(this.p("total-slides")),
            reverso: parseBool(this.p("reverso"))
        }

        this.render();
        this.renderContainer();

        if (window.location.href.toString().indexOf("192.168") > 0) {
            this.debug = true;
        }

        if (this.container)
            this.container.style.height = (window.innerHeight - this.REDUCE_HEIGHT).toString();
    }

    setCurrentIndex(newIndex: number) {
        if (this.container) {
            let newIndexElement = this.container.children[newIndex] as HTMLElement;

            //A altura do container deve representar 60% da altura da tela 
            this.container.style.height = (window.innerHeight - this.REDUCE_HEIGHT).toString();

            newIndexElement.classList.remove("close");
            newIndexElement.classList.remove("close-left");


            switch (this.touchMove.direction) {
                case "prev":
                    newIndexElement.classList.add("show-right");
                    break;

                case "next":
                    newIndexElement.classList.add("show");
                    break;
            }

            if (this.currentIndex !== newIndex) {
                let oldIndexElement = this.container.children[this.currentIndex] as HTMLElement;

                oldIndexElement.classList.remove("show");
                oldIndexElement.classList.remove("show-right");

                switch (this.touchMove.direction) {
                    case "prev":
                        oldIndexElement.classList.add("close-left");
                        break;

                    case "next":
                        oldIndexElement.classList.add("close");
                        break;
                }
            }

            this.currentIndex = newIndex;

            this.render();
        }
    }

    setIndex = (pIdx: number) => {

        if (pIdx > this.currentIndex) {
            this.touchMove = {
                ...this.touchMove,
                direction: "next"
            };

        } else {
            this.touchMove = {
                ...this.touchMove,
                direction: "prev"
            };

        }

        this.setCurrentIndex(pIdx);
    }

    prev = () => {

        this.touchMove = {
            ...this.touchMove,
            direction: "prev"
        };


        if (this.currentIndex > 0) {
            this.setCurrentIndex(this.currentIndex - 1);
            return;
        }
        this.setCurrentIndex(this.props.totalSlides - 1);
    }

    next = () => {

        this.touchMove = {
            ...this.touchMove,
            direction: "next"
        };

        if (this.currentIndex < this.props.totalSlides - 1) {
            this.setCurrentIndex(this.currentIndex + 1);
            return;
        }
        this.setCurrentIndex(0);

    }


    onTouchStart = (e: TouchEvent) => {

        if (e.touches && e.touches.length > 0) {

            this.touchMove = {
                ...this.touchMove,
                startPosX: e.touches[0].screenX,
                startPosY: e.touches[0].screenY,
            };
        }

    }

    onTouchMove = (e: TouchEvent) => {

        if (e.touches && e.touches.length > 0) {

            this.touchMove = {
                ...this.touchMove,
                endPosX: e.touches[0].screenX,
                endPosY: e.touches[0].screenY,
            };

        }
    }

    diferencaX: number;

    onTouchEnd = (e: TouchEvent) => {

        //Só calcula se o fim do movimento for maior que zero
        if (this.touchMove.endPosX > 0) {
            this.diferencaX = this.touchMove.startPosX - this.touchMove.endPosX;
            var diferencaY = this.touchMove.startPosY - this.touchMove.endPosY;

            //Se negativos, equaliza para positivo
            if (this.diferencaX < 0) {
                this.diferencaX = this.diferencaX * -1;
            }

            if (diferencaY < 0) {
                diferencaY = diferencaY * -1;
            }

            //O espaçamento do X deve ser maior que a do Y
            //para caracterizar um movimento horizontal
            if (this.diferencaX > diferencaY) {
                if (this.diferencaX > 110) {
                    if (this.touchMove.endPosX < this.touchMove.startPosX) {
                        this.prev();
                    } else if (this.touchMove.endPosX > this.touchMove.startPosX) {
                        this.next();
                    }
                }
            }

            //Zera o movimento para preparar para o próximo gesto
            this.touchMove = {
                ...this.touchMove,
                endPosX: 0,
                endPosY: 0,
            };
        }
    }

    renderContainer() {

        this.container = this.renderChildren();
        if (this.container) {
            this.container.addEventListener("touchstart", e => this.onTouchStart(e));
            this.container.addEventListener("touchmove", e => this.onTouchMove(e));
            this.container.addEventListener("touchend", e => this.onTouchEnd(e));

            this.setCurrentIndex(0);
        }

    }

    slideDotsClick(e) {
        this.setIndex(e.detail.idx);
    }

    render() {

        this.childrenHTML = this.innerHTML;

        this.dotsList = [];

        for (let d = 0; d < this.props.totalSlides; d++) {
            this.dotsList.push(d);
        }

        if (this.props.reverso) {
            this.dotsList = this.dotsList.sort((a, b) => {
                return b - a;
            });
        }

        // ${this.debug ? html`<div class="debug-console">${this.diferencaX + " " + this.touchMove.startPosX + " " + this.touchMove.endPosX}</div>` : null}

        render(this, html`
        
             <div class="points-bar">
                ${this.dotsList.map((item, idx) => html`<app-mini-slide-dots  idx=${item} current-idx=${this.currentIndex} @updateclick=${e => this.slideDotsClick(e)} />`)}
            </div>

            <div id="container"></div>

            <div class="btn-slide-nav left" onclick=${(e) => this.prev()}>
                <div class="text">
                    <div class="ico-arrow">
                    </div>
                </div>
            </div>

            <div class="btn-slide-nav right" onclick=${e => this.next()}>
                <div class="text">
                    <div class="ico-arrow">
                    </div>
                </div>
            </div>
             
             `);

    }
}

window.customElements.define("app-mini-slide", AppMiniSlide);


class AppMiniSlideDots extends Base {

    constructor() {
        super();
    }

    props: {
        idx: number;
        currentIdx: number;
    }


    static get observedAttributes() {
        return ['current-idx'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "current-idx") {
            this.props = {
                ...this.props,
                currentIdx: parseInt(newValue)
            }
        }

        this.render();
    }

    connectedCallback() {

        this.props = {
            idx: parseInt(this.p("idx")),
            currentIdx: parseInt(this.p("current-idx"))
        }

        this.render();
    }

    setDotIndex(e: any) {

        if (e.currentTarget !== null) {

            this.dispatchEvent(new CustomEvent("updateclick", {
                detail: {
                    idx: this.props.idx
                }
            }));
        }
    }


    render() {

        render(this, html`<div class=${`point ${this.props.currentIdx === this.props.idx ? 'show' : ''}`} idx=${0} onClick=${e => this.setDotIndex(e)}></div>`)
    }

}

window.customElements.define("app-mini-slide-dots", AppMiniSlideDots);