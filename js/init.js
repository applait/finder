window.addEventListener("DOMContentLoaded", function () {

    // Initiate the app with a config. This will instantiate the api and invoke all
    // module registrations
    app({
        page: location.hash.slice(2),
        root: document.querySelector("body"),
        debug: true
    });

});
