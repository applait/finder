(function () {

    app(function (api) {

        // Perform renders required before:load
        api.on("before:load", function (path) {

            var topnavtmpl = $("#tmpl-topnav-" + path.split("/")[0]) || $("#tmpl-topnav-default");

            if (topnavtmpl) {
                $(api.args.topnav).innerHTML = riot.render(topnavtmpl.innerHTML.trim(), {
                    searchkey: api.finder.searchkey
                });
            }

        });

    });

})();
