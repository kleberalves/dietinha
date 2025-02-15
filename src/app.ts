import { openTab } from "./lib/tabs";
import { loadTheme, META_DIARIA_STORE } from "./service/config.service";
import { store } from "./service/store.service"


(() => {

    // store.addStore(INGREDIENTES_STORE);
    // store.addStore(CARDAPIO_STORE);
    // store.addStore(ALIMENTACAO_STORE);
    // store.addStore(CONFIG_STORE);
    // store.addStore(META_DIARIA_STORE);

    loadTheme();

    var consumo: [] = store.getItems(META_DIARIA_STORE);

    if (consumo.length === 0) {
        openTab("tabHomeCaloriaDiaria");
    } else {
        //TODO
        // var cardapio = loadCardapio();
        // if (isNullOrEmpty(cardapio)) {
        //     openForm("tabHomeCalculadora");
        // } else {
        //     openForm("tabHomeCardapio");
    }
})();