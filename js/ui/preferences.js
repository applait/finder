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
                    localStorage.setItem("finderDebug", "1");
                } else {
                    localStorage.setItem("finderDebug", "0");
                }
                console.log(localStorage.getItem("finderDebug"));
            }, false);

            case_pref.addEventListener("click", function () {
                if (this.checked) {
                    localStorage.setItem("finderCase", "1");
                } else {
                    localStorage.setItem("finderCase", "0");
                }
            }, false);

            hidden_pref.addEventListener("click", function () {
                if (this.checked) {
                    localStorage.setItem("finderHidden", "1");
                } else {
                    localStorage.setItem("finderHidden", "0");
                }
            }, false);

            // Memory Cleanup
            debug_pref = case_pref = hidden_pref = null;

        });
    });

})();
