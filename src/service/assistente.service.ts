
import { showOk } from "../lib/message.lib";
import useRequest from "../lib/request";
import { uuidv4 } from "../lib/uuidv4";
import { buscarProdutoPorId } from "./calculo.service";
import { API_MODULE_DIET, stores } from "./config.service";
import { globalErrors } from "./login.service";
import { store } from "./store.service";
import { sync } from "./sync.service";

export const sendAssistente = () => {

    const { post } = useRequest(API_MODULE_DIET);

    var ingredientesItems: IngredienteAssistente[] = store.getItems(stores.IngredienteAssistente);

    post(`/assistente`, {
        "ingredienteAssistenteItems": ingredientesItems,
    }).then(async (resp: ISync) => {
        showOk("Os ingredientes foram enviados com sucesso para a fila de processamento. Em breve os novos itens estarão disponíveis no seu cardápio.");
        //store.clear(stores.IngredienteAssistente);
    }).catch((e) => {
        globalErrors(e);
    }).finally(() => {
        sync();
    });

}

export const removerIngredienteAssistente = (id?: string) => {

    if (id)
        store.removeItemById(stores.IngredienteAssistente, id);

}


export const addIngredienteAssistente = (idProduto: string, tipo: string) => {
    var produto = buscarProdutoPorId(idProduto);

    if (produto !== undefined) {
        store.addItem<IngredienteAssistente>(stores.IngredienteAssistente, {
            "nome": produto.nome,
            "idProduto": produto.id,
            "categoria": produto.categoria,
            "tipo": tipo
        } as IngredienteAssistente);
    }
}


export const adicionaPreItems = (): IngredienteAssistente[] => {

    let ingredientes: IngredienteAssistente[] = store.getItems(stores.IngredienteAssistente);

    //Só adiciona se o store estiver vazio
    if (ingredientes && ingredientes.length === 0) {
        let idsCA = [
            "5ee1a661-6090-4be8-80eb-a97e5a451183",
            "965e4400-91e0-4d99-97a0-c8d1fc0fc534",
            "9e14deed-27f8-477a-83f4-4450589cf34a",
            "698db76b-cc5b-4d3b-8e48-acdf225ef7c8",
            "6e604173-d6b4-47eb-8b44-303dc207df9a",
            "a5c3d8ce-35d5-4364-b23c-13c21e797ba2",
            "2d39e358-5f9f-4653-8dba-82037f1bf959"];

        let idsAJ = [
            "d9e1a7ba-24cd-450a-a001-4b5d779cf2d8",
            "9d3dd118-a687-4455-8549-e1f9f2baf7e5",
            "524cf49c-c675-4808-bf2d-b1976d97e447",
            "20f80da3-3261-4caf-bc98-dc551bfaf78e",
            "dc304a7c-ff1c-4f74-b5eb-e1fe168ee008",
            "0ec99cbe-f70c-4b54-a5f3-b261f91621b0",
            "2a1774c2-c8f6-4015-a0b3-a9a5a16436b1",
            "63a210b4-b088-4a11-95c4-f09596d4363a",
            "4062bea0-298d-4b66-92fa-49c9001aa090",
            "05084a61-3174-4dcf-bb29-06638c87cdbf",
            "698db76b-cc5b-4d3b-8e48-acdf225ef7c8",
            "6e604173-d6b4-47eb-8b44-303dc207df9a"];

        /**
         * CA" /> <span>Café da manhã/tarde
            AJ" /> <span>Almoço/Jantar</span
            LC" /> <span>Lanches</span> </di
            SM" /> <span>Sobremesas</span> <
         */
        ingredientes = loopAddPreItems("CA", idsCA);

        let ingredientesAJ: IngredienteAssistente[] = loopAddPreItems("AJ", idsAJ);

        ingredientes = [
            ...ingredientes,
            ...ingredientesAJ
        ]

        store.addItemsAll(stores.IngredienteAssistente, ingredientes);
    }

    return ingredientes;
}

const loopAddPreItems = (tipo: string, ids: string[]): IngredienteAssistente[] => {
    let ingredientes: IngredienteAssistente[] = [];

    for (let i = 0; i < ids.length; i++) {
        let produto = buscarProdutoPorId(ids[i]);
        if (produto) {
            ingredientes.push({
                "id": uuidv4(),
                "nome": produto.nome,
                "idProduto": produto.id,
                "categoria": produto.categoria,
                "tipo": tipo
            })
        }
    }

    return ingredientes;
}