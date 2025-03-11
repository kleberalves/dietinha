import { store } from "./store.service";

export const INGREDIENTES_STORE = "INGREDIENTES_STORE";
export const CARDAPIO_STORE = "CARDAPIO_STORE";
export const ALIMENTACAO_STORE = "ALIMENTACAO_STORE";
export const CONFIG_STORE = "CONFIG_STORE";
export const META_DIARIA_STORE = "META_DIARIA_STORE";
export const META_DIARIA_STORE_HISTORICO = "META_DIARIA_STORE_HISTORICO";
export const LOGIN_STORE = "LOGIN_STORE";
export const API_BASE_URL_SERVER = "API_BASE_URL_SERVER";

export const swapTheme = () => {
    var link = document.getElementById("styTheme");

    if (link) {
        var current = link.getAttribute("href");
        if (current && current.indexOf("light") > -1) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }
}

export const getenv = (key: string) => {

    if (key === API_BASE_URL_SERVER) {
        if (window.location.host.toLowerCase().indexOf("192.168") > -1) {
            return "http://localhost:3005";
        } else {
            return `https://${window.location.host}/api`;
        }
    }
}

export const setTheme = (theme: string) => {
    var link = document.getElementById("styTheme");
    if (link)
        link.setAttribute("href", "css/theme." + theme + ".css");

    store.updateItemsByFields<Dictionary>(CONFIG_STORE,
        [{ key: "key", value: "theme" }],
        [{ key: "value", value: theme }]);
}


export const loadTheme = () => {
    var theme = store.getItemByField<Dictionary>(CONFIG_STORE, { key: "key", value: "theme" });

    if (theme === undefined || theme.value === undefined) {
        setTheme("light");
    } else {
        if (typeof theme.value === "string")
            setTheme(theme.value);
    }
}
