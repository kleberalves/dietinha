function logInstall() {

    console.stdlog = console.log.bind(console);
    console.stderror = console.error.bind(console);

    console.now = function () {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000;
        return (new Date(Date.now() - tzoffset)).toISOString()
    }
    console.logs = [];

    console.pushLogs = function (args, type) {

        if (console.logs.length === 1000) {
            console.logs = [];
        }

        var lst = Array.from(args);
        lst.push(type);
        lst.push(console.now());
        console.logs.push(lst);
    }


    console.log = function () {
        console.pushLogs(arguments, "log");
        console.stdlog.apply(console, arguments);
    }

    console.error = function () {
        console.pushLogs(arguments, "error");
        console.stderror.apply(console, arguments);
    }

    setInterval(function () {
        console.stdlog(console.logs.length);
    }, 50000);

}