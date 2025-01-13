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

    saveDataLocal({ "theme": theme }, "theme");
}

function loadTheme() {
    var theme = loadDataLocal("theme");
    if (theme === null) {
        setTheme("light");
    } else {
        setTheme(theme.theme);
    }
}