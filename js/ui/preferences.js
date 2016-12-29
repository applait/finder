(function () {

    app(function (api) {

        api.on("load:about", function () {

            var debug_pref = $("#debugToggle"),
                case_pref = $("#caseToggle"),
                hidden_pref = $("#hiddenToggle");

            !!parseInt(localStorage.getItem("finderDebug")) ?
                (debug_pref.checked = true) :
                (debug_pref.checked = false);

            !!parseInt(localStorage.getItem("finderCase")) ?
                (case_pref.checked = true) :
                (case_pref.checked = false);

            !!parseInt(localStorage.getItem("finderHidden")) ?
                (hidden_pref.checked = true) :
                (hidden_pref.checked = false);

            debug_pref.addEventListener("click", function () {
                if (this.checked) {
                    api.finder.debugmode = true;
                    localStorage.setItem("finderDebug", "1");
                } else {
                    api.finder.debugmode = false;
                    localStorage.setItem("finderDebug", "0");
                }
            }, false);

            case_pref.addEventListener("click", function () {
                if (this.checked) {
                    api.finder.casesensitive = true;
                    localStorage.setItem("finderCase", "1");
                } else {
                    api.finder.casesensitive = false;
                    localStorage.setItem("finderCase", "0");
                }
            }, false);

            hidden_pref.addEventListener("click", function () {
                if (this.checked) {
                    api.finder.hidden = true;
                    localStorage.setItem("finderHidden", "1");
                } else {
                    api.finder.hidden = false;
                    localStorage.setItem("finderHidden", "0");
                }
            }, false);

            // Memory Cleanup
            debug_pref = case_pref = hidden_pref = null;

        });
    });

})();
