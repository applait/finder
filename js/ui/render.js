(function () {

    app(function (api) {

        // Perform renders required before:load
        api.on("before:load", function (path) {

            var topnavtmpl = document.querySelector("#tmpl-topnav-" + path);

            if (topnavtmpl) {
                document.querySelector(api.args.topnav).innerHTML = riot.render(topnavtmpl.innerHTML.trim());
            }

        });

    });

})();
