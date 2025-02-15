//export { };

import { loadLocalStorage, saveDataLocal } from "../lib/local-storage";
import { uuidv4 } from "../lib/uuidv4";


export const store = (() => {

      const getItemByField = <T>(storeName: string, query: Dictionary) => {

        let store = loadLocalStorage(storeName);
        let item: T;

        if (store === null)
            return undefined;

        for (let i = 0; i < store.items.length; i++) {
            item = store.items[i] as T;

            if (item[query.key] === query.value) {
                return item;
            }
        }

    }

    const addItem = <T>(storeName: string, item: any) => {

        return new Promise((resolve, reject) => {

            try {

                let store = loadLocalStorage(storeName);

                if (store === null) {
                    store = {
                        name: storeName,
                        items: []
                    }
                }

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
                );

                resolve(item);

            }
            catch (e) {
                reject(e);
            }
        });

    }

    const updateItemsByFields = <T>(storeName: string, conditions: Dictionary[], values: Dictionary[]) => {

        let store = loadLocalStorage(storeName);
        let item: T;

        if (store === null) {
            store = {
                name: storeName,
                items: []
            }
        }

        //Se a lista estiver vazia, adiciona na lista
        if (store.items.length === 0) {

            let item: T = {} as T;

            for (let q = 0; q < conditions.length; q++) {
                item[conditions[q].key] = conditions[q].value;
            }

            for (let v = 0; v < values.length; v++) {
                item[values[v].key] = values[v].value;
            }

            addItem<T>(storeName, item);

        } else {

            for (let i = 0; i < store.items.length; i++) {
                item = store.items[i] as T;

                let cont = 0;
                for (let q = 0; q < conditions.length; q++) {
                    if (item[conditions[q].key] === conditions[q].value) {
                        cont++;
                    }
                }

                if (cont === conditions.length) {
                    for (let v = 0; v < values.length; v++) {
                        item[values[v].key] = values[v].value;
                    }

                    //Salva por padrão no localStorage
                    saveDataLocal(store, storeName);

                    window.dispatchEvent(
                        new CustomEvent(STORE_UPDATED_ITEM, {
                            detail: {
                                store: storeName,
                                item: item,
                                items: store.items
                            }
                        })
                    );

                    return item;

                }
            }
        }
    }

    return {
        /** Adiciona um item na store. A propriedade "Id" será criada no formato uuid (guid) */
        addItem: addItem,
        /** Retorna uma lista de itens de acordo com a uma query/lista de 
        * Dictionary onde "key" é o nome da coluna e value é o valor exato. */
        getItemByField: getItemByField,
        /** Atualiza ou insere um conjunto de itens com um conjunto de valores */
        updateItemsByFields: updateItemsByFields,
        /** Obtém os items no Local Storage */
        getItems: <T>(storeName: string) => {

            let store = loadLocalStorage(storeName);
            if (store !== null) {
                return store["items"] as T;
            } else {
                return [] as T;
            }
        },
        /** Limpa todos os dados da store incluindo no local storage */
        clear: (storeName: string) => {

            let store = loadLocalStorage(storeName);
            if (store !== null) {

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

        /** Retorna um item pelo "Id" */
        getItemById: <T>(storeName: string, itemId: string) => {

            return getItemByField<T>(storeName, {
                key: "id",
                value: itemId
            });
        },
        /** Retorna uma lista de itens de acordo com a uma query/lista de 
         * Dictionary onde "key" é o nome da coluna e value é o valor exato. */
        getItemsByFields: <T>(storeName: string, query: Dictionary[]) => {

            let store = loadLocalStorage(storeName);
            let item: T;

            let result: T[] = [] as T[];

            if (store !== null) {

                for (let i = 0; i < store.items.length; i++) {
                    item = store.items[i] as T;

                    let cont = 0;
                    for (let q = 0; q < query.length; q++) {
                        if (item[query[q].key] === query[q].value) {
                            cont++;
                        }
                    }
                    if (cont === query.length) {
                        result.push(item);
                    }
                }
                return result;

            } else {
                return [] as T;
            }
        },
        /** Remove um item pelo "Id" */
        removeItemById: (storeName: string, itemId: string) => {

            let store = loadLocalStorage(storeName);
            let item: any;

            if (store !== null) {

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
        },

        onUpdatedItem: (storeName: string, func: (e: CustomEventInit) => void) => {
            window.addEventListener(STORE_UPDATED_ITEM, (e: CustomEventInit) => {

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
export const STORE_UPDATED_ITEM = "STORE_UPDATED_ITEM";


declare global {
    interface Window {
        STORE_ADDED_ITEM: string;
        STORE_REMOVED_ITEM: string;
    }
}
