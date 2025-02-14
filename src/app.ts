import { store } from "./service/store.service"

export const INGREDIENTES_STORE = "INGREDIENTES_STORE";
export const CARDAPIO_STORE = "CARDAPIO_STORE";
export const ALIMENTACAO_STORE = "ALIMENTACAO_STORE";

(() => {

    store.addStore(INGREDIENTES_STORE);
    store.addStore(CARDAPIO_STORE);
    store.addStore(ALIMENTACAO_STORE);

})();