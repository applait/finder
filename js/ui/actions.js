(function () {

    // Add behaviour for option buttons
    app(function (api) {

        /**
         * Actions to perform when reset button is clicked
         */
        var resetbtn_action = function () {
            api.reset();
            document.querySelector(api.args.searchinput).value = "";
            document.querySelector(api.args.searchinput).focus();
        };

        /**
         * Actions to perform when search button is clicked
         */
        var searchbtn_action = function () {
            api.search(document.querySelector(api.args.searchinput).value.trim());
        };

        /**
         * Bind delegated listeners for elements in topnav
         */
        document.querySelector(api.args.topnav).addEventListener("click", function (e) {

            if (e.target && e.target.id) {

                switch ("#" + e.target.id) {

                case api.args.searchbtn:
                    searchbtn_action();
                    break;

                };
            }

        }, false);

        /**
         * Bind delegated listeners for elements in bottomnav
         */
        document.querySelector(api.args.bottomnav).addEventListener("click", function (e) {

            if (e.target && e.target.id) {

                switch ("#" + e.target.id) {

                case api.args.resetbtn:
                    resetbtn_action();
                    break;

                };
            }

        }, false);

    });
})();
