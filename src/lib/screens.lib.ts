import { scrollElementTo } from "../service/animation.service";

let SCREEN_HEIGHT:number = 80;

export const resizeScreens = () => {
    var screens = document.getElementsByClassName('screen') as HTMLCollectionOf<HTMLDivElement>;

    for (let t = 0; t < screens.length; t++) {
        screens[t].style.height = (window.innerHeight - SCREEN_HEIGHT).toString();
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

                // for (var i = 0; i < screens.length; i++) {
                //     if (screens[i].id !== screen.id) {
                //         closeScreen(screens[i].id);
                //     }
                // }

                //window.history.replaceState({}, "", "#/"+id);
                window.history.pushState({}, "", "#/" + id);
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