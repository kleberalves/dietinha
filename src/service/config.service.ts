import { store } from "./store.service";

export const CARDAPIO_STORE = "CARDAPIO_STORE";
export const REGISTRO_REFEICAO_STORE = "REGISTRO_REFEICAO_STORE";
export const CONFIG_STORE = "CONFIG_STORE";
export const PERFIL_STORE = "PERFIL_STORE";
export const PERFIL_STORE_HISTORICO = "PERFIL_STORE_HISTORICO";
export const LOGIN_STORE = "LOGIN_STORE";
export const API_BASE_URL_SERVER = "API_BASE_URL_SERVER";
export const API_MODULE_DIET = "diet";
export const API_RECAPTCHA = "6LcxsKoUAAAAANcv1ELzcW54Yh9SWoLuPMdSdStN";

export const stores = {
    Ingrediente: "INGREDIENTES_STORE",
    Cardapio: "CARDAPIO_STORE",
    RegistroRefeicao: "REGISTRO_REFEICAO_STORE",
    Config: "CONFIG_STORE",
    Perfil: "PERFIL_STORE",
    Login: "LOGIN_STORE",
}

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

    //DEV mode
    if (window.location.host.toLowerCase().indexOf("localhost") > -1) {
        switch (key) {
            case API_BASE_URL_SERVER:
                return "http://localhost:3005";

            case API_MODULE_DIET:
                return "http://localhost:3007";

        }
    } else {
        switch (key) {
            case API_BASE_URL_SERVER:
                return `https://${window.location.host}/api`;

            case API_MODULE_DIET:
                return `${getenv(API_BASE_URL_SERVER)}-${API_MODULE_DIET}`

        }
    }
}

export const setTheme = (theme: string) => {
    var link = document.getElementById("styTheme");
    if (link)
        link.setAttribute("href", "css/theme." + theme + ".css");

    store.updateItemsByFields<Dictionary>(CONFIG_STORE,
        [],
        [{ key: "value", value: theme }, { key: "key", value: "theme" }]);
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
