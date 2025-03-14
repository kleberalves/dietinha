import { showOk, showWarning } from "../lib/message.lib";
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

            if (resp && resp.cardapioItems && resp.cardapioItems.length > 0) {
                await store.addItemsAll(CARDAPIO_STORE, resp.cardapioItems);
            }

            showOk("Seus dados foram sincronizados com sucesso.");
            resolve("ok");

        }).catch((e) => {
            if (e.error) {
                showWarning(e.error.message);
            } else {
                showWarning(e);
            }
            reject("error");
        });

    });

    return promise;

}