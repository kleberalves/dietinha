import { startAnimation } from "../lib/animations";

export const scrollBodyTop = (to:number) => {
    let body = document.querySelector("body");
    if (body) {
        startAnimation(body.scrollTop,
            to,
            (value) => {
                body.scrollTop = value;
            }, () => {
                console.log("animatio finished");
            });
    }
}