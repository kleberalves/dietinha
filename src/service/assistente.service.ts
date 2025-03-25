
import { showOk } from "../lib/message.lib";
import useRequest from "../lib/request";
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
    }).finally(()=>{
        sync();
    });

}

export const removerIngredienteAssistente = (id?: string) => {

    if (id)
        store.removeItemById(stores.IngredienteAssistente, id);

}


export const addIngredienteStorage = (idProduto: string) => {
    var produto = buscarProdutoPorId(idProduto);

    if (produto !== undefined) {

        store.addItem<IngredienteAssistente>(stores.IngredienteAssistente, {
            "nome": produto.nome,
            "idProduto": produto.id,
            "categoria": produto.categoria
        } as IngredienteAssistente);
    }
}


export const adicionaPreItems = (): IngredienteAssistente[] => {

    let ids = [
        "524cf49c-c675-4808-bf2d-b1976d97e447",
        "20f80da3-3261-4caf-bc98-dc551bfaf78e",
        "0ec99cbe-f70c-4b54-a5f3-b261f91621b0",
        "2a1774c2-c8f6-4015-a0b3-a9a5a16436b1",
        "6e604173-d6b4-47eb-8b44-303dc207df9a",
        "5ee1a661-6090-4be8-80eb-a97e5a451183",
        "10be8214-5bb2-4e56-802d-8e4a26a9858e",
        "a5c3d8ce-35d5-4364-b23c-13c21e797ba2",
        "05084a61-3174-4dcf-bb29-06638c87cdbf",
        "d9e1a7ba-24cd-450a-a001-4b5d779cf2d8",
        "9d3dd118-a687-4455-8549-e1f9f2baf7e5",
        "63e8232a-fce2-4a8d-bba5-6eba474a4e92",
        "63a210b4-b088-4a11-95c4-f09596d4363a",
        "4062bea0-298d-4b66-92fa-49c9001aa090",
        "9e14deed-27f8-477a-83f4-4450589cf34a",
        "dc304a7c-ff1c-4f74-b5eb-e1fe168ee008",
        "698db76b-cc5b-4d3b-8e48-acdf225ef7c8"];

    let ingredientes: IngredienteAssistente[] = store.getItems(stores.IngredienteAssistente);

    //Só adiciona se o store estiver vazio

    if (ingredientes && ingredientes.length === 0) {
        for (let i = 0; i < ids.length; i++) {
            let produto = buscarProdutoPorId(ids[i]);
            if (produto) {
                ingredientes.push({
                    "id": produto.id,
                    "nome": produto.nome,
                    "idProduto": produto.id,
                    "categoria": produto.categoria
                })
            }
        }

        store.addItemsAll(stores.IngredienteAssistente, ingredientes);
    }

    return ingredientes;
} 