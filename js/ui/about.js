(function () {

    // Attach a ready callback to the app
    app(function (api) {

        // Decide what happens when about page is asked to load
        api.on("load:about", function () {
            console.log("about loaded", api);
        });

    });

})();
