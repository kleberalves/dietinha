function saveDataLocal(data, key) {
    if (typeof data !== "string") {
        data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
}

function loadDataLocal(key) {
    var data = localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
}