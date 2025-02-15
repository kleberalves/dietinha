import { openTab } from "./lib/tabs";
import { CARDAPIO_STORE, loadTheme, META_DIARIA_STORE } from "./service/config.service";
import { store } from "./service/store.service"


(() => {

    // store.addStore(INGREDIENTES_STORE);
    // store.addStore(CARDAPIO_STORE);
    // store.addStore(ALIMENTACAO_STORE);
    // store.addStore(CONFIG_STORE);
    // store.addStore(META_DIARIA_STORE);

    loadTheme();

})();