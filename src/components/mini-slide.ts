import { Base } from "./Base";
import { html, render } from "uhtml";


class AppMiniSlide extends Base {

    constructor() {
        super();
    }

    container: HTMLDivElement;

    props: {
        totalSlides: number;
    };

    currentIndex: number = 0;
    touchMove = {
        startPosition: 0,
        lastPosition: 0,
        direction: "next"
    };

    currentHeight = 0;

    dotsList:number[] =[];

    connectedCallback() {

        this.props = {
            totalSlides: parseInt(this.p("total-slides"))
        }

        this.render();
        this.renderContainer();
    }

    setCurrentIndex(newIndex: number) {

        let newIndexElement = this.container.children[newIndex] as HTMLElement;

        this.container.style.height = newIndexElement.clientHeight.toString();

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

            let startPosition = e.touches[0].screenX;

            this.touchMove = {
                startPosition: startPosition,
                lastPosition: 0,
                direction: ""
            };
        }
    }

    onTouchMove = (e: TouchEvent) => {

        if (e.touches && e.touches.length > 0) {

            let touchMove = e.touches[0].screenX;

            this.touchMove = {
                ...this.touchMove,
                lastPosition: touchMove
            };
        }
    }


    onTouchEnd = (e: TouchEvent) => {

        if (this.touchMove.lastPosition > 0) {
            if (this.touchMove.lastPosition < this.touchMove.startPosition) {
                this.prev();
            } else if (this.touchMove.lastPosition > this.touchMove.startPosition) {
                this.next();
            }
        }
    }

    renderContainer() {

        this.container = this.querySelector("#container") as HTMLDivElement;
        if (this.container &&
            this.childrenHTML !== undefined &&
            this.childrenHTML !== null) {
            this.container.innerHTML = this.childrenHTML;
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

        for(let d=0;d<this.props.totalSlides;d++){
            this.dotsList.push(d);
        }

        this.dotsList = this.dotsList.sort((a,b)=>{
            return b-a;
        });

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