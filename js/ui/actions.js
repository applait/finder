(function () {

    // Add behaviour for option buttons
    app(function (api) {

        /**
         * Actions to perform when reset button is clicked
         */
        var resetbtn_action = function () {
            var searchinput = $(api.args.searchinput);
            api.reset();
            $("#home section").innerHTML = riot.render($("#tmpl-home-stock").innerHTML.trim());

            // If searchinput exists, we are on home page. So reset
            if (searchinput) {
                searchinput.value = "";
                searchinput.focus();
            }
            // Else add a one time listener for home load. This will make sure
            // searchinput exists by then.
            else {
                api.one("load:home", function () {
                    var searchinput = $(api.args.searchinput);
                    searchinput.value = "";
                    searchinput.focus();
                    searchinput = null; // Cleanup
                });
            }

            // Cleanup memory
            searchinput = null;
        };

        /**
         * Actions to perform when search button is clicked
         */
        var searchbtn_action = function () {
            api.search($(api.args.searchinput).value.trim());
        };

        /**
         * Actions to perform when cancel button is clicked
         */
        var cancelbtn_action = function () {
            api.activityRequest && api.activityRequest.postError("Pick cancelled.");
        };

        /**
         * Bind delegated listeners for elements in topnav
         */
        $(api.args.topnav).addEventListener("click", function (e) {

            if (e.target && e.target.id) {

                switch ("#" + e.target.id) {

                case api.args.searchbtn:
                    searchbtn_action();
                    break;

                }
            }

        }, false);

        /**
         * Bind delegated listeners for elements in bottomnav
         */
        $(api.args.bottomnav).addEventListener("click", function (e) {

            if (e.target && e.target.id) {

                switch ("#" + e.target.id) {

                case api.args.resetbtn:
                    resetbtn_action();
                    break;

                case api.args.cancelbtn:
                    cancelbtn_action();
                    break;

                }
            }

        }, false);

        /**
         * Bind delegated listeners for form handling
         */
        api.args.root.addEventListener("submit", function (e) {
            e.preventDefault();

            if (e.target && e.target.id && e.target.id === api.args.searchform.substr(1)) {
                searchbtn_action();
            }
            return false;
        }, false);

        /**
         * Handle error actions
         */
        api.finder.on("error", function () {
            alert("Oops. Looks like your device does not support Finder.");
            $(api.args.resetbtn).removeAttribute("disabled");
            $(api.args.searchbtn).removeAttribute("disabled");
            $(api.args.searchinput).removeAttribute("disabled");
            resetbtn_action();

        });

        api.finder.on("empty", function () {
            alert("Oops. Your device does not have any storage to search from.");
            $(api.args.resetbtn).removeAttribute("disabled");
            $(api.args.searchbtn).removeAttribute("disabled");
            $(api.args.searchinput).removeAttribute("disabled");
            resetbtn_action();
        });

    });
})();
