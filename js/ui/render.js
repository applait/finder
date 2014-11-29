(function () {

    app(function (api) {

        // Perform renders required before:load
        api.on("before:load", function (path) {

            var topnavtmpl = $("#tmpl-topnav-" + path.split("/")[0]) || $("#tmpl-topnav-default"),
                bottomnavtmpl = $("#tmpl-bottomnav-" + path.split("/")[0]) || $("#tmpl-bottomnav-default");

            if (topnavtmpl) {
                $(api.args.topnav).innerHTML = riot.render(topnavtmpl.innerHTML.trim(), {
                    searchkey: api.finder.searchkey
                });
            }

            if (bottomnavtmpl) {
                $(api.args.bottomnav).innerHTML = riot.render(bottomnavtmpl.innerHTML.trim());
            }

            // Memory cleanup
            topnavtmpl = bottomnavtmpl = null;

        });

    });

})();
