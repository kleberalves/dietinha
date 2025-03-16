//export { };

import { loadLocalStorage, removeLocalStorage, saveDataLocal } from "../lib/local-storage";
import { localISOString } from "../lib/treatments";
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

    const addItem = <T>(storeName: string, item: BaseItem) => {

        return new Promise((resolve, reject) => {

            try {

                let store = loadLocalStorage(storeName);

                if (store === null) {
                    store = {
                        name: storeName,
                        items: []
                    }
                }

                item["id"] = uuidv4();
                item["created"] = localISOString();

                store.items.push(item);

                //Salva por padrão no localStorage
                saveDataLocal(store, storeName);

                window.dispatchEvent(
                    new CustomEvent(STORE_ADDED_ITEM, {
                        detail: {
                            store: storeName,
                            item: item,
                            items: filterActive(store.items)
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

    const addItemsAll = <T>(storeName: string, items: T[]) => {

        return new Promise((resolve, reject) => {

            try {

                let store = {
                    name: storeName,
                    items: items as T[]
                }

                //Salva por padrão no localStorage
                saveDataLocal(store, storeName);

                window.dispatchEvent(
                    new CustomEvent(STORE_ADDED_ITEM, {
                        detail: {
                            store: storeName,
                            items: filterActive<T>(store.items as BaseItem[])
                        }
                    })
                );

                resolve(store.items);

            }
            catch (e) {
                reject(e);
            }
        });

    }

    const replaceBatch = (stores: [{ storeName: string, items: BaseItem[] }]) => {
        stores.forEach((store) => {
            replaceList(store.storeName, store.items);
        });

        window.dispatchEvent(
            new CustomEvent(STORE_REPLACED_ALL)
        );

    }
    const replaceList = <T>(storeName: string, items: BaseItem[]) => {

        let store = {
            name: storeName,
            items: items
        }

        saveDataLocal(store, storeName);

    }

    const updateSingle = <T>(storeName: string, item: BaseItem) => {


        let items: any[] = store.getItems(storeName);

        let conditions: Dictionary[] = [];

        if (items.length > 0) {
            conditions.push({
                key: "id",
                value: items[0].id
            })

            item["id"] = items[0].id;
        }

        updateItem<T>(storeName, conditions, item);

    }

    const updateItemsByFields = <T>(storeName: string, conditions: Dictionary[], values: Dictionary[]) => {

        let store = loadLocalStorage(storeName);
        let item: BaseItem = {} as BaseItem;

        if (store === null) {
            store = {
                name: storeName,
                items: []
            }
        }

        //Se a lista estiver vazia, adiciona na lista
        if (store.items.length === 0) {

            for (let v = 0; v < values.length; v++) {
                item[values[v].key] = values[v].value;
            }

            addItem<T>(storeName, item);

        } else {

            for (let i = 0; i < store.items.length; i++) {
                item = store.items[i] as BaseItem;

                let cont = 0;
                for (let q = 0; q < conditions.length; q++) {
                    if (item[conditions[q].key] === conditions[q].value) {
                        cont++;
                    }
                }

                if (cont === conditions.length) {
                    //TODO: Mudar para ITEM ao invés de uma lista de values  
                    for (let v = 0; v < values.length; v++) {
                        item[values[v].key] = values[v].value;
                    }

                    item["updated"] = localISOString();

                    //Salva por padrão no localStorage
                    saveDataLocal(store, storeName);

                    window.dispatchEvent(
                        new CustomEvent(STORE_UPDATED_ITEM, {
                            detail: {
                                store: storeName,
                                item: item,
                                items: filterActive(store.items)
                            }
                        })
                    );
                }
            }
        }

        saveHistorico<T>(storeName, item);

        return item;

    }

    const updateItem = <T>(storeName: string, conditions: Dictionary[], item: BaseItem) => {

        let store = loadLocalStorage(storeName);

        if (store === null) {
            store = {
                name: storeName,
                items: []
            }
        }

        //Se a lista estiver vazia, adiciona na lista
        if (store.items.length === 0) {

            addItem<T>(storeName, item);

        } else {

            for (let i = 0; i < store.items.length; i++) {
                let localItem = store.items[i] as BaseItem;

                let cont = 0;
                for (let q = 0; q < conditions.length; q++) {
                    if (item[conditions[q].key] === conditions[q].value) {
                        cont++;
                    }
                }

                if (cont === conditions.length) {

                    let props = Object.entries(item);
                    for (let p = 0; p < props.length; p++) {
                        localItem[props[p][0]] = props[p][1];
                    }

                    localItem["updated"] = localISOString();

                    //Salva por padrão no localStorage
                    saveDataLocal(store, storeName);

                    window.dispatchEvent(
                        new CustomEvent(STORE_UPDATED_ITEM, {
                            detail: {
                                store: storeName,
                                item: localItem,
                                items: filterActive(store.items)
                            }
                        })
                    );
                }
            }
        }

        saveHistorico<T>(storeName, item);

        return item;

    }

    const saveHistorico = <T>(storeName: string, item: BaseItem) => {

        let storeNameHistorico = `${storeName}_HISTORICO`;
        let storeHistorico = loadLocalStorage(storeNameHistorico);

        if (storeHistorico === null) {
            storeHistorico = {
                name: storeNameHistorico,
                items: []
            }
        }

        storeHistorico.items.push(item);
        saveDataLocal(storeHistorico, storeNameHistorico);
    }


    const getItemsFull = <BaseItem>(storeName: string): BaseItem[] => {

        let store = loadLocalStorage(storeName);
        if (store !== null) {
            return store["items"] as BaseItem[];
        } else {
            return [] as BaseItem[];
        }
    }

    const filterActive = <T>(storeItems: BaseItem[]): T[] => {
        return storeItems.filter((item, b, c) => {
            return item.deleted === null || item.deleted === undefined;
        }) as T[];
    }

    const getItems = <T>(storeName: string): T[] => {

        let storeItems = getItemsFull<BaseItem>(storeName);
        if (storeItems.length > 0) {
            return filterActive(storeItems);
        } else {
            return [] as T[];
        }
    }

    const clear = (storeName: string) => {

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
        }
    }

    return {
        //Atualiza integralmente os elementos de uma storage
        replaceList: replaceList,
        getItemsFull: getItemsFull,
        addItemsAll: addItemsAll,
        /** Adiciona um item na store. A propriedade "Id" será criada no formato uuid (guid) */
        addItem: addItem,
        /** Retorna uma lista de itens de acordo com a uma query/lista de 
        * Dictionary onde "key" é o nome da coluna e value é o valor exato. */
        getItemByField: getItemByField,
        /** Atualiza ou insere um conjunto de itens com um conjunto de valores */
        updateItemsByFields: updateItemsByFields,
        /** Atualiza ou insere um conjunto de itens com um conjunto de valores */
        updateSingle: updateSingle,
        /** Obtém os items no Local Storage */
        getItems: getItems,
        /** Obtém os items no Local Storage */
        getSingle: <T>(storeName: string): T | null => {
            let items: T[] = getItems<T>(storeName);
            if (items.length === 0) {
                return null;
            }
            return items[0];
        },
        /** Limpa todos os dados da store do local storage */
        clear: clear,
        /** Limpa todos os stores do local storage */
        clearAll: (stores: object) => {

            let storesLst = Object.entries(stores);
            for (let p = 0; p < storesLst.length; p++) {
                clear(storesLst[p][1]);
            }

            window.dispatchEvent(
                new CustomEvent(STORE_ALL_CLEARED, {
                    detail: null
                })
            )

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

                        item["deleted"] = localISOString();

                        saveDataLocal(store, storeName);

                        window.dispatchEvent(
                            new CustomEvent(STORE_REMOVED_ITEM, {
                                detail: {
                                    store: storeName,
                                    item: item,
                                    items: filterActive(store.items)
                                }
                            })
                        )

                        break;
                    }
                }


            } else {
                throw new Error("Store não existe.")
            }
        },
        replaceBatch: replaceBatch,
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

        onClearedAll: (func: (e: CustomEventInit) => void) => {
            window.addEventListener(STORE_ALL_CLEARED, (e: CustomEventInit) => {
                func(e);
            });
        },

        /** Quando os storages são atualizaods completamente. */
        onReplacedAll: (func: (e: CustomEventInit) => void) => {
            window.addEventListener(STORE_REPLACED_ALL, (e: CustomEventInit) => {
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
export const STORE_ALL_CLEARED = "STORE_ALL_CLEARED";
export const STORE_STORAGE_LOADED = "STORE_STORAGE_LOADED";
export const STORE_UPDATED_ITEM = "STORE_UPDATED_ITEM";
export const STORE_REPLACED_ALL = "STORE_REPLACED_ALL";

declare global {
    interface Window {
        STORE_ADDED_ITEM: string;
        STORE_REMOVED_ITEM: string;
    }
}
