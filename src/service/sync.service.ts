import useRequest from "../lib/request";
import { API_MODULE_DIET, stores } from "./config.service";
import { globalErrors, updateLastSync } from "./login.service";
import { store } from "./store.service";

export const onSync = (func: (e: CustomEventInit) => void) => {
    window.addEventListener("START_SYNC", (e: CustomEventInit) => {
        func(e);
    });
}

export const onSyncEnd = (func: (e: CustomEventInit) => void) => {
    window.addEventListener("END_SYNC", (e: CustomEventInit) => {
        func(e);
    });
}

export const sync = () => {

    const { post } = useRequest(API_MODULE_DIET);

    var perfilItem: Perfil | null = store.getSingle(stores.Perfil);
    var cardapioItems: CardapioItem[] = store.getItemsFull(stores.Cardapio);
    var registroRefeicaoItems: RegistroRefeicaoItem[] = store.getItemsFull(stores.RegistroRefeicao);

    window.dispatchEvent(
        new CustomEvent("START_SYNC")
    );

    post(`/sync`, {
        "cardapioItems": cardapioItems,
        "perfil": perfilItem,
        "registroRefeicaoItems": registroRefeicaoItems
    }, true).then(async (resp: ISync) => {

        let storesReplace: any = [];
        if (resp) {
            if (resp.cardapioItems && resp.cardapioItems.length > 0) {
                storesReplace.push({
                    storeName: stores.Cardapio,
                    items: resp.cardapioItems
                });
            }

            if (resp.registroRefeicaoItems && resp.registroRefeicaoItems.length > 0) {
                storesReplace.push({
                    storeName: stores.RegistroRefeicao,
                    items: resp.registroRefeicaoItems
                });
            }

            storesReplace.push({
                storeName: stores.Processamento,
                items: resp.processamentosItems
            });

            if (resp.perfil !== undefined && resp.perfil !== null) {
                storesReplace.push({
                    storeName: stores.Perfil,
                    items: [resp.perfil]
                });
            }

            await store.replaceBatch(storesReplace);
        }

        window.dispatchEvent(
            new CustomEvent("END_SYNC", {
                detail: {
                    lastSync: updateLastSync()
                }
            })
        );

    }).catch((e) => {

        window.dispatchEvent(
            new CustomEvent("END_SYNC", {
                detail: {
                    lastSync: undefined
                }
            })
        );

        globalErrors(e);
    });

}