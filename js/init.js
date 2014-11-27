window.addEventListener("DOMContentLoaded", function () {

    // Initiate the app with a config. This will instantiate the api and invoke all
    // module registrations
    app({
        path: location.hash.slice(2),
        root: document.querySelector("body"),
        searchinput: document.querySelector("#searchinput"),
        debug: true
    });

});
