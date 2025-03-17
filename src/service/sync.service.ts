import { showOk, showWarning } from "../lib/message.lib";
import useRequest from "../lib/request";
import { API_MODULE_DIET, stores } from "./config.service";
import { globalErrors } from "./login.service";
import { store } from "./store.service";

export const sync = () => {
    let promise = new Promise<string>((resolve, reject) => {

        const { post } = useRequest(API_MODULE_DIET);

        var perfilItem: Perfil | null = store.getSingle(stores.Perfil);
        var cardapioItems: CardapioItem[] = store.getItemsFull(stores.Cardapio);
        var registroRefeicaoItems: RegistroRefeicaoItem[] = store.getItemsFull(stores.RegistroRefeicao);

        post(`/sync`, {
            "cardapioItems": cardapioItems,
            "perfil": perfilItem,
            "registroRefeicaoItems": registroRefeicaoItems
        }).then(async (resp: ISync) => {


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

                if (resp.perfil !== undefined && resp.perfil !== null) {
                    storesReplace.push({
                        storeName: stores.Perfil,
                        items: [resp.perfil]
                    });
                }

                await store.replaceBatch(storesReplace);
            }

            showOk("Dados sincronizados com sucesso.");
            resolve("ok");

        }).catch((e) => {
            globalErrors(e);
            reject("error");
        });

    });

    return promise;

}