(function () {

    // Implement routing based on riot.route

    app(function (api) {

        // Add a delegated event listener to the root element defined by the app init.
        // This listens to all clicks and triggers riot.route(TO) only if the target
        // element has "data-goto" attribute beginning with "#/".
        api.args.root.addEventListener("click", function (e) {

            var goto = e.target && e.target.dataset && e.target.dataset.goto;

            if (goto && goto.indexOf("#/") === 0) {
                e.preventDefault();

                riot.route(goto);
            }

        }, false);

        // Next, listen to riot.route(fn), which will trigger the things we need to do
        // to actually perform what happens when a new page is called. For now, we just
        // do api.trigger("load:" + url)
        riot.route(function (path) {
            api.load(path.substr(2));
        });

        /**
         * Before load hook for views
         */
        api.on("before:load", function (next) {
            var prev = $("#" + api.view);
            next = $("#" + next.split("/")[0]);

            prev && prev.classList.remove("active-view");
            next && next.classList.add("active-view");
        });

    });

})();
