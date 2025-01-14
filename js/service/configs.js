function loadConfigs() {
    loadTheme();
}

function swapTheme() {
    var link = document.getElementById("styTheme");

    var current = link.getAttribute("href");
    if (current.indexOf("light") > -1) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
}

function setTheme(theme) {
    var link = document.getElementById("styTheme");
    link.setAttribute("href", "css/theme." + theme + ".css");

    saveConfig("theme", theme);
}


function loadTheme() {
    var config = loadConfig();
    if (config === null || config.theme === undefined) {
        setTheme("light");
    } else {
        setTheme(config.theme);
    }
}

function loadConfig() {
    return loadDataLocal("config");
}

function saveConfig(key, value) {

    var config = loadConfig();

    config = {
        ...config,
        [key]: value
    }

    saveDataLocal(config, "config");
}
