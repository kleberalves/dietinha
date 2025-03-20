function logInstall() {

    console.stdlog = console.log.bind(console);

    console.now = function () {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000;
        return (new Date(Date.now() - tzoffset)).toISOString()
    }
    console.logs = [];
    console.log = function () {

        if (console.logs.length === 1000) {
            console.logs = [];
        }

        var lst = Array.from(arguments);
        lst.push(console.now());
        console.logs.push(lst);
        console.stdlog.apply(console, arguments);
    }

    setInterval(function () {
        console.stdlog(console.logs.length);
    }, 50000);

}