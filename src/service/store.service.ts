import { loadLocalStorage, saveDataLocal } from "../lib/local-storage";
import { localISOString } from "../lib/treatments";
import { uuidv4 } from "../lib/uuidv4";

const events = {
    addedItem: "STORE_ADDED_ITEM",
    removedItem: "STORE_REMOVED_ITEM",
    changed: "STORE_CHANGED",
    cleared: "STORE_CLEARED",
    clearedAll: "STORE_ALL_CLEARED",
    loaded: "STORE_STORAGE_LOADED",
    updatedItem: "STORE_UPDATED_ITEM",
    replacedAll: "STORE_REPLACED_ALL",
    editStart: "STORE_EDIT_START",
    editFinished: "STORE_EDIT_FINISHED"
}

const internal = {
    Edit: "EDIT_STORE"
}

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

                if (!item["id"]) {
                    item["id"] = uuidv4();
                }

                item["created"] = localISOString();

                store.items.push(item);

                //Salva por padrão no localStorage
                saveDataLocal(store, storeName);

                window.dispatchEvent(
                    new CustomEvent(events.addedItem, {
                        detail: {
                            store: storeName,
                            item: item,
                            items: filterActive(store.items)
                        }
                    })
                );

                window.dispatchEvent(
                    new CustomEvent(events.changed, {
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
                    new CustomEvent(events.addedItem, {
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
            new CustomEvent(events.replacedAll)
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

    const updateCreate = <T>(storeName: string, item: BaseItem) => {
        let conditions: Dictionary[] = [];

        if (item.id) {
            conditions.push({
                key: "id",
                value: item.id
            })
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
                        new CustomEvent(events.updatedItem, {
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

    const updateItem = async <T>(storeName: string, conditions: Dictionary[], item: BaseItem) => {

        let store = loadLocalStorage(storeName);

        if (store === null) {
            store = {
                name: storeName,
                items: []
            }
        }

        //Se a lista estiver vazia, adiciona na lista
        if (store.items.length === 0 || !item.id) {
            await addItem<T>(storeName, item);
        } else if (conditions.length > 0) {

            for (let i = 0; i < store.items.length; i++) {

                let cont = 0;
                for (let q = 0; q < conditions.length; q++) {
                    if (store.items[i][conditions[q].key] === conditions[q].value) {
                        cont++;
                    }
                }

                if (cont === conditions.length) {

                    let props = Object.entries(item);
                    for (let p = 0; p < props.length; p++) {
                        store.items[i][props[p][0]] = props[p][1];
                    }

                    store.items[i]["updated"] = localISOString();

                    //Salva por padrão no localStorage
                    saveDataLocal(store, storeName);

                    window.dispatchEvent(
                        new CustomEvent(events.updatedItem, {
                            detail: {
                                store: storeName,
                                item: store.items[i],
                                items: filterActive(store.items)
                            }
                        })
                    );

                    window.dispatchEvent(
                        new CustomEvent(events.changed, {
                            detail: {
                                store: storeName,
                                item: store.items[i],
                                items: filterActive(store.items)
                            }
                        })
                    );

                    saveHistorico<T>(storeName, item);

                }
            }
        }

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
            return item === null ? null : (item.deleted === undefined || item.deleted === null);
        }) as T[];
    }

    const getItems = <T>(storeName: string): T[] => {

        let storeItems = getItemsFull<BaseItem>(storeName);
        if (storeItems !== null && storeItems.length > 0) {
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
                new CustomEvent(events.cleared, {
                    detail: {
                        store: storeName
                    }
                })
            )

            window.dispatchEvent(
                new CustomEvent(events.changed, {
                    detail: {
                        store: storeName
                    }
                })
            );
        }
    }
    const editStart = <T>(storeName: string, item: BaseItem) => {
        let edit = {
            itemRef: item,
            store: storeName
        }

        store.updateSingle(internal.Edit, edit as Edit);

        window.dispatchEvent(
            new CustomEvent(events.editStart, {
                detail: edit
            })
        )
    }

    const editCheck = () => {
        let items = store.getItems(internal.Edit);
        if (items.length > 0) {
            window.dispatchEvent(
                new CustomEvent(events.editStart, {
                    detail: items[0]
                })
            )
        }
    }

    const editFinish = () => {

        store.clear(internal.Edit);

        window.dispatchEvent(
            new CustomEvent(events.editFinished, {
                detail: null
            })
        )
    }
    return {
        /** Verifica se tem algum item na storage para edição e sinaliza o início */
        editCheck: editCheck,
        /** Sinaliza o fim da edição de qualquer item.*/
        editFinish: editFinish,
        /** Sinaliza a edição do item e a storage respectiva */
        editStart: editStart,
        /** Atualiza ou criar pelo ID*/
        updateCreate: updateCreate,
        /** Atualiza integralmente os elementos de uma storage */
        replaceBatch: replaceBatch,
        /** Obtém todos os itens da storage, incluindos os marcados como "deleted" */
        getItemsFull: getItemsFull,
        addItemsAll: addItemsAll,
        /** Adiciona um item na store. A propriedade "Id" será criada no formato uuid (guid) */
        addItem: addItem,
        /** Retorna uma lista de itens de acordo com a uma query/lista de 
        * Dictionary onde "key" é o nome da coluna e value é o valor exato. */
        getItemByField: getItemByField,
        /** Atualiza ou insere um conjunto de itens com um conjunto de valores */
        updateItemsByFields: updateItemsByFields,
        /** Atualiza ou insere um item em uma storage */
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
                new CustomEvent(events.clearedAll, {
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
                            new CustomEvent(events.removedItem, {
                                detail: {
                                    store: storeName,
                                    item: item,
                                    items: filterActive(store.items)
                                }
                            })
                        )

                        window.dispatchEvent(
                            new CustomEvent(events.changed, {
                                detail: {
                                    store: storeName,
                                    item: item,
                                    items: filterActive(store.items)
                                }
                            })
                        );

                        break;
                    }
                }


            } else {
                throw new Error("Store não existe.")
            }
        },
        onAddedItem: (func: (e: CustomEventInit) => void) => {
            window.addEventListener(events.addedItem, func);
        },
        removeOnAddedItem: (func: (e: CustomEventInit) => void) => {
            window.removeEventListener(events.addedItem, func);
        },
        onRemovedItem: (func: (e: CustomEventInit) => void) => {
            window.addEventListener(events.removedItem, func);
        },
        removeOnRemovedItem: (func: (e: CustomEventInit) => void) => {
            window.removeEventListener(events.removedItem, func);
        },
        onCleared: (func: (e: CustomEventInit) => void) => {
            window.addEventListener(events.cleared, func);
        },
        removeOnCleared: (func: (e: CustomEventInit) => void) => {
            window.removeEventListener(events.cleared, func);
        },
        /** Quando ocorre quando ocorre qualquer evento de inserção, update e delete, sendo em elemento singular. */
        onChanged: (storeName: string, func: (e: CustomEventInit) => void) => {
            window.addEventListener(events.changed, (e: CustomEventInit) => {
                if (e.detail.store !== storeName) {
                    return;
                }
                func(e);
            });
        },
        onClearedAll: (func: (e: CustomEventInit) => void) => {
            window.addEventListener(events.clearedAll, (e: CustomEventInit) => {
                func(e);
            });
        },
        /** Quando os storages são atualizaods completamente. */
        onReplacedAll: (func: (e: CustomEventInit) => void) => {
            window.addEventListener(events.replacedAll, (e: CustomEventInit) => {
                func(e);
            });
        },
        onUpdatedItem: (storeName: string, func: (e: CustomEventInit) => void) => {
            window.addEventListener(events.updatedItem, (e: CustomEventInit) => {

                if (e.detail.store !== storeName) {
                    return;
                }
                func(e);

            });
        },
        onEditStarted: (func: (e: CustomEventInit) => void) => {
            window.addEventListener(events.editStart, func);
        },
        onEditFinished: (func: (e: CustomEventInit) => void) => {
            window.addEventListener(events.editFinished, func);
        },
        removeEditEvents: (start: (e: CustomEventInit) => void, end: (e: CustomEventInit) => void) => {
            window.removeEventListener(events.editStart, start);
            window.removeEventListener(events.editFinished, end);
        }
    }
})();


