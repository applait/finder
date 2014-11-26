(function () {

    // Extend a global `app` object which lets modules attach codes
    // to the app.


    // This api is used to initialize the FinderModel and send out to others
    var api;

    /**
     * Make the app riot.observable, making it capable of handling events
     */
    var app = riot.observable(function (arg) {

        // If `app` is called without arguments, return the api
        if (!arg) {
            return api;
        }

        // If argument is a function, it has come from a module,
        // so attach it for the `ready` event of `app`.
        if (typeof arg === "function") {
            app.on("ready", arg);
        }
        // If argument is not a function, it is a config object, so use it to
        // instantiate `FinderModel` api and trigger the `ready` event, passing `api`
        // as the argument, so that all modules which are listening to the `ready`
        // event can access the `api`.
        else {
            api = new FinderModel(arg);

            app.trigger("ready", api);
        }

        // Return the `api` so that the `app` call can be chained when initiating
        return api;
    });

    // Make app global
    window.app = app;

})();
