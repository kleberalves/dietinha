import { scrollElementTo } from "../service/animation.service";
import { getDivByClassId } from "./dom";
import { isNullOrEmpty } from "./treatments";

export const swapScreen = (id: string) => {

    var screens = document.getElementsByClassName('screen') as HTMLCollectionOf<HTMLDivElement>;

    for (let t = 0; t < screens.length; t++) {
        let screen = screens[t];
        if (screen.id === id) {


            if (screen.classList.contains("close")) {

                let navBtns = document.querySelectorAll(".btn-screen-switch");
                for (let i = 0; i < navBtns.length; i++) {
                    if (navBtns[i].id === `${id}Nav`) {
                        navBtns[i].classList.add("open");
                    } else {
                        navBtns[i].classList.remove("open");
                    }
                }

                for (var i = 0; i < screens.length; i++) {
                    if (screens[i].id !== screen.id) {
                        closeScreen(screens[i].id);
                    }
                }

                //window.history.replaceState({}, "", "#/"+id);
                window.history.pushState({}, "", "#/"+id);
                //https://adityaprabhat.hashnode.dev/routing-in-single-page-application

                execOpen(screen as HTMLElement);
            }

        } else {
            closeScreen(screens[t].id);
        }
    }
}

const openScreen = (screenId: string) => {

    var screen = getDivByClassId("screen", screenId) as HTMLDivElement;
    if (isNullOrEmpty(screen)) {
        return;
    }

    execOpen(screen as HTMLElement);
}

const execOpen = (element: HTMLElement) => {
    setTimeout(() => {
        element.classList.add("open");
        element.classList.remove("close");
        element.style.height = (window.innerHeight - 85).toString();
        scrollElementTo(element, 0);
    }, 150);
}

const closeScreen = (screenId: string) => {

    var screen = getDivByClassId("screen", screenId) as HTMLDivElement;
    if (isNullOrEmpty(screen)) {
        return;
    }

    //Só fecha se estiver aberto
    if (screen !== undefined && screen.classList.contains("open")) {

        screen.classList.remove("open");

        setTimeout(() => {
            screen.classList.add("close");
        }, 150);
    }

}