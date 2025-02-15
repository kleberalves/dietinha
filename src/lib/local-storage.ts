export const saveDataLocal = (data, key) => {
    if (typeof data !== "string") {
        data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
}

export const loadLocalStorage = (key: string): any | null => {
    var data = localStorage.getItem(key);

    if (data) {
        data = JSON.parse(data);
    }
    return data;
}