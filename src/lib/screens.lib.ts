import { setActiveToken } from "../service/login.service";
import { scrollElementTo } from "./animations";

let SCREEN_HEIGHT: number = 80;

export const resizeScreens = () => {
    var screens = document.getElementsByClassName('screen') as HTMLCollectionOf<HTMLDivElement>;

    for (let t = 0; t < screens.length; t++) {
        screens[t].style.height = (window.innerHeight - SCREEN_HEIGHT).toString();
    }
}

export const detectPathScreen = (onDetected?: (paths: string[]) => void) => {

    const hashPaths = window.location.hash.split("/");
    if (hashPaths.length >= 2) {
        var screens = document.getElementsByClassName('screen') as HTMLCollectionOf<HTMLDivElement>;
        for (let t = 0; t < screens.length; t++) {
            if (screens[t].id === hashPaths[1]) {
                if (!screens[t].classList.contains("open")) {
                    if (onDetected) {
                        onDetected(hashPaths);
                    }
                    swapScreen(hashPaths[1]);
                }

                return;
            }
        }

        swapScreen("notfound");
    }
}

export const swapScreen = (id: string) => {

    var screens = document.getElementsByClassName('screen') as HTMLCollectionOf<HTMLDivElement>;

    for (let t = 0; t < screens.length; t++) {
        let screen = screens[t];
        if (screen.id === id) {
            if (!screen.classList.contains("open")) {

                let navBtns = document.querySelectorAll(".btn-screen-switch");
                for (let i = 0; i < navBtns.length; i++) {
                    if (navBtns[i].id === `${id}Nav`) {
                        navBtns[i].classList.add("open");
                    } else {
                        navBtns[i].classList.remove("open");
                    }
                }

                setTimeout(() => {
                    screen.classList.add("open");
                    screen.classList.remove("close");
                    screen.style.height = (window.innerHeight - SCREEN_HEIGHT).toString();
                    scrollElementTo(screen, 0);
                    window.location.href = "#/" + id;
                }, 150);

                //window.history.pushState(null, "", "#/" + id);
                //https://adityaprabhat.hashnode.dev/routing-in-single-page-application

            }

        } else {
            closeScreen(screens[t]);
        }
    }
}

export const goBack = () => {
    history.back();
}

const closeScreen = (screen: HTMLElement) => {
    //Só fecha se estiver aberto
    if (screen !== undefined && screen.classList.contains("open")) {

        screen.classList.remove("open");

        setTimeout(() => {
            screen.classList.add("close");
        }, 150);
    }

}