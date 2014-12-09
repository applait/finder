(function () {

    // Implement routing based on riot.route

    app(function (api) {

        // Add a delegated event listener to the root element defined by the app init.
        // This listens to all clicks and triggers riot.route(TO) only if the target
        // element has "data-goto" attribute beginning with "#/".
        api.args.root.addEventListener("click", function (e) {

            var target = e.target;

            while(target.dataset && typeof target.dataset.goto === "undefined") {
                target = target.parentNode;
            }

            var goto = target.dataset && target.dataset.goto;

            if (goto && goto.indexOf("#/") === 0) {
                e.preventDefault();
                riot.route(goto);
            } else if (goto && goto === "back") {
                api.pushhistory = false;
                riot.route("#/" + api.history.pop());
            }

            // Memory cleanup
            goto = target = null;

        }, false);

        // Next, listen to riot.route(fn), which will trigger the things we need to do
        // to actually perform what happens when a new page is called. For now, we just
        // do api.trigger("load:" + url)
        riot.route(function (path) {
            api.load(path.substr(2));
            api.pushhistory = true;
        });

        /**
         * Before load hook for views
         */
        api.on("before:load", function (next) {
            var prev = $("#" + api.view.split("/")[0]);
            next = $("#" + next.split("/")[0]);

            prev && prev.classList.remove("active-view");
            next && next.classList.add("active-view");

            // Memory cleanup
            prev = next = null;
        });

    });

})();
