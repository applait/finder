var global = window,
    finder;

global.app = riot.observable(function (arg) {

    if (!arg) {
        return instance;
    }

    if (typeof arg === "function") {
        app.on("ready", arg);
    } else {
        finder = new FinderModel(arg);

        finder.on("ready", function () {
            app.trigger("ready", instance);
        });
    }
});
