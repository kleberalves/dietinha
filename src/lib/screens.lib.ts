import { scrollElementTo } from "../service/animation.service";

let SCREEN_HEIGHT: number = 80;

export const resizeScreens = () => {
    var screens = document.getElementsByClassName('screen') as HTMLCollectionOf<HTMLDivElement>;

    for (let t = 0; t < screens.length; t++) {
        screens[t].style.height = (window.innerHeight - SCREEN_HEIGHT).toString();
    }
}

export const detectPathScreen = () => {
   
    const hashPaths = window.location.hash.split("/");
    if (hashPaths.length === 2) {
        var screens = document.getElementsByClassName('screen') as HTMLCollectionOf<HTMLDivElement>;
        for (let t = 0; t < screens.length; t++) {
            if(screens[t].id === hashPaths[1]){
                swapScreen(hashPaths[1]);
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

                window.history.pushState(null, "", "#/" + id);
                //https://adityaprabhat.hashnode.dev/routing-in-single-page-application

                execOpen(screen as HTMLElement);
            }

        } else {
            closeScreen(screens[t]);
        }
    }
}

const execOpen = (element: HTMLElement) => {
    setTimeout(() => {
        element.classList.add("open");
        element.classList.remove("close");
        element.style.height = (window.innerHeight - SCREEN_HEIGHT).toString();
        scrollElementTo(element, 0);
    }, 150);
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