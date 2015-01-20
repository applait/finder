(function () {

    app(function (api) {

        api.on("load:about", function () {

        var debug_pref = $("#debugToggle");

        // Set the current state of the debug checkbox depending on the config value in localStorage.
        // If the localStorage item is not set, or if it has a falsy value, then keep the checkbox disabled either way.
        localStorage.getItem("finderDebug") ? debug_pref.setAttribute("checked", "checked") ? debug_pref.removeAttribute("checked");

        // We need to change the values of the FinderJS instance only when user interacts with the checkbox.
        // In that case, we change the state of the checkbox, set/unset value of the config option in localStorage and
        // change the value of the current instance of FinderJS.
        // The question is, can we affect the properties of the current FinderJS instance outside this module?
        // We may either need to use `api.finder.debugmode` or `app().finder.debugmode`, whichever works.
        // If none of these work, add a "Save" button, which will just be a hyperlink to "index.html".
        /* debug_pref.addEventListener("touchend", function () {
            debug_pref.checked ?
                (localStorage.setItem("finderDebug", true) :
                (localStorage.setItem("finderDebug", false);
        }, false);
*/
        debug_pref.addEventListener("touchend", function () {
            if(debug_pref.getAttribute("checked") == "checked") {
                localStorage.setItem("finderDebug", "true");
            }
            else {
                localStorage.setItem("finderDebug", "false");
            }
        }, false);
        //Memory Cleanup
        /*debug_pref = case_pref = hidden_pref = null;*/


        });

    });

})();
