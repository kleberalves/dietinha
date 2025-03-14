import { showWarning } from "../lib/message.lib";
import useRequest from "../lib/request";
import { REGISTRO_REFEICAO_STORE, CARDAPIO_STORE, PERFIL_STORE, API_MODULE_DIET } from "./config.service";
import { store } from "./store.service";

export const sync = () => {
    let promise = new Promise<string>((resolve, reject) => {

        const { post } = useRequest(API_MODULE_DIET);

        var perfilItem: Perfil | null = store.getSingle(PERFIL_STORE);
        var cardapioItems: CardapioItem[] = store.getItemsFull(CARDAPIO_STORE);
        var registroRefeicaoItems: RegistroRefeicaoItem[] = store.getItems(REGISTRO_REFEICAO_STORE);

        // "perfil": perfilItem,
        // "registros": registroRefeicaoItems,

        post(`/sync`, {
            "cardapioItems": cardapioItems
        }).then(async (resp) => {

            if (typeof resp === "string") {
                showWarning(resp);

            } else if (resp) {

                const responseBody = await resp.json();
                if (responseBody.error) {
                    showWarning(responseBody.error.message);
                    resolve("ok");
                } else {

                    await store.addItemsAll(CARDAPIO_STORE, responseBody.cardapioItems);
                    resolve("ok");
                }
            } else {
                resolve("ok");
            }

        }).catch((e) => {
            showWarning(e.error.message);
            reject("error");
        });

    });

    return promise;

}