import { getDivByClassId } from "./dom";
import { isNullOrEmpty } from "./treatments";

export const swapScreen = (id: string) => {

    var screens = document.getElementsByClassName('screen') as HTMLCollectionOf<HTMLDivElement>;

    for (let t = 0; t < screens.length; t++) {
        let screen = screens[t];
        if (screen.id === id) {

            var state = screen.classList.contains("close");

            if (!state) {
                screen.classList.remove("open");

                setTimeout(() => {
                    screen.classList.add("close");
                }, 150);
            } else {

                for (var i = 0; i < screens.length; i++) {
                    if (screens[i].id !== screen.id) {
                        closeScreen(screens[i].id);
                    }
                }

                setTimeout(() => {
                    screen.classList.add("open");
                    screen.classList.remove("close");

                }, 150);
            }

        } else {
            closeScreen(screens[t].id);
        }
    }
}

export function openScreen(screenId: string) {

    var screen = getDivByClassId("screen", screenId) as HTMLDivElement;
    if (isNullOrEmpty(screen)) {
        return;
    }

    setTimeout(() => {
        screen.classList.add("open");
        screen.classList.remove("close");
    }, 150);
}

export function closeScreen(screenId: string) {

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