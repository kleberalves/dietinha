//export { };

import { loadLocalStorage, saveDataLocal } from "../lib/local-storage";
import { uuidv4 } from "../lib/uuidv4";


export const store = (() => {
    let state = {};

    return {
        /** Adiciona/Ccnfigura uma store */
        addStore: (storeName: string) => {

            if (state[storeName] === undefined) {
                state = {
                    [storeName]: {
                        name: storeName,
                        items: []
                    },
                    ...state
                };
            } else {
                throw new Error("Store já existe.")
            }
        },
        /** Obtém os items no Local Storage */
        getItems: (storeName: string) => {

            let storeLocal = loadLocalStorage(storeName);
            if (storeLocal !== null) {
                state = {
                    ...state,
                    [storeName]: storeLocal
                };

                return storeLocal["items"];
            } else {
                let store = state[storeName];
                if (store !== undefined) {
                    return store.items;
                } else {
                    throw new Error("Store não existe.")
                }
            }
        },
        /** Limpa todos os dados da store incluindo no local storage */
        clear: (storeName: string) => {

            let store = state[storeName];

            if (store !== undefined) {

                store.items = [];

                saveDataLocal(store, storeName);

                window.dispatchEvent(
                    new CustomEvent(STORE_CLEARED, {
                        detail: {
                            store: storeName
                        }
                    })
                )
            } else {
                throw new Error("Store não existe.")
            }
        },
        /** Adiciona um item na store. A propriedade "Id" será criada no formato uuid (guid) */
        addItem: (storeName: string, item: any) => {

            let store = state[storeName];

            if (store !== undefined) {
                item.id = uuidv4();
                store.items.push(item);

                //Salva por padrão no localStorage
                saveDataLocal(store, storeName);

                window.dispatchEvent(
                    new CustomEvent(STORE_ADDED_ITEM, {
                        detail: {
                            store: storeName,
                            item: item,
                            items: store.items
                        }
                    })
                )
            } else {
                throw new Error("Store não existe.")
            }
        },
        /** Retorna um item pelo "Id" */
        getItemById: <T>(storeName: string, itemId: string) => {

            let store = state[storeName];
            let item: any;

            if (store !== undefined) {

                for (let i = 0; i < store.items.length; i++) {
                    item = store.items[i];

                    if (item.id === itemId) {
                        return item as T;
                    }
                }


            } else {
                throw new Error("Store não existe.")
            }
        },
        /** Remove um item pelo "Id" */
        removeItemById: (storeName: string, itemId: string) => {

            let store = state[storeName];
            let item: any;

            if (store !== undefined) {

                for (let i = 0; i < store.items.length; i++) {
                    item = store.items[i];

                    if (item.id === itemId) {
                        store.items.splice(i, 1);

                        saveDataLocal(store, storeName);

                        window.dispatchEvent(
                            new CustomEvent(STORE_REMOVED_ITEM, {
                                detail: {
                                    store: storeName,
                                    item: item,
                                    items: store.items
                                }
                            })
                        )
                    }
                }


            } else {
                throw new Error("Store não existe.")
            }
        },
        onAddedItem: (storeName: string, func: (e: CustomEventInit) => void) => {
            window.addEventListener(STORE_ADDED_ITEM, (e: CustomEventInit) => {

                if (e.detail.store !== storeName) {
                    return;
                }
                func(e);

            });
        },
        onRemovedItem: (storeName: string, func: (e: CustomEventInit) => void) => {
            window.addEventListener(STORE_REMOVED_ITEM, (e: CustomEventInit) => {

                if (e.detail.store !== storeName) {
                    return;
                }
                func(e);

            });
        },
        onCleared: (storeName: string, func: (e: CustomEventInit) => void) => {
            window.addEventListener(STORE_CLEARED, (e: CustomEventInit) => {

                if (e.detail.store !== storeName) {
                    return;
                }
                func(e);

            });
        }
    }
})();

export const STORE_ADDED_ITEM = "STORE_ADDED_ITEM";
export const STORE_REMOVED_ITEM = "STORE_REMOVED_ITEM";
export const STORE_CLEARED = "STORE_CLEARED";
export const STORE_STORAGE_LOADED = "STORE_STORAGE_LOADED";

declare global {
    interface Window {
        STORE_ADDED_ITEM: string;
        STORE_REMOVED_ITEM: string;
    }
}
