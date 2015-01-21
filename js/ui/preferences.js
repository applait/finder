(function () {

    app(function (api) {

        api.on("load:about", function () {

        var debug_pref = $("#debugToggle");
        !!parseInt(localStorage.getItem("finderDebug")) ?
        (debug_pref.checked = true) :
        (debug_pref.checked = false);

        var case_pref = $("#caseToggle");
        !!parseInt(localStorage.getItem("finderCase")) ?
        (case_pref.checked = true) :
        (case_pref.checked = false);

        var hidden_pref = $("#hiddenToggle");
        !!parseInt(localStorage.getItem("finderHidden")) ?
        (hidden_pref.checked = true) :
        (hidden_pref.checked = false);

        debug_pref.addEventListener("click", function () {
            if (debug_pref.checked) {
                localStorage.setItem("finderDebug", "1");
            } else {
                localStorage.setItem("finderDebug", "0");
            }
        }, false);

        case_pref.addEventListener("click", function () {
            if (case_pref.checked) {
                localStorage.setItem("finderCase", "1");
            } else {
                localStorage.setItem("finderCase", "0");
            }
        }, false);

        hidden_pref.addEventListener("click", function () {
            if (hidden_pref.checked) {
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
