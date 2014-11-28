(function () {

    app(function (api) {

        api.on("load:home", function () {

            if ($(api.args.searchinput)) {
                $(api.args.searchinput).value = "";
                $(api.args.searchinput).focus();
            }

        });

    });

})();
