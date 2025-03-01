import { startAnimation } from "../lib/animations";

export const scrollBodyTop = (to:number) => {
    let body = document.querySelector("body");
    scrollElementTo(body as HTMLElement, to);
}

export const scrollElementTo = (element:HTMLElement, to:number) => {
    if (element) {
        startAnimation(element.scrollTop,
            to,
            (value) => {
                element.scrollTop = value;
            });
    }
}