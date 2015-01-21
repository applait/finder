window.addEventListener("DOMContentLoaded", function () {

    var options = {
        path: "home",
        root: $("body"),
        topnav: "#topnav",
        bottomnav: "#bottomnav",
        searchinput: "#topnav-input",
        searchbtn: "#searchbtn",
        cancelbtn: "#cancelbtn",
        resetbtn: "#resetbtn",
        pickbtn: "#pickbtn",
        searchform: "#searchform",
        debug: !!parseInt(localStorage.getItem("finderDebug")),
        caseSensitive: !!parseInt(localStorage.getItem("finderCase")),
        hiddenFiles: !!parseInt(localStorage.getItem("finderHidden")),
        activityRequest: false
    };

    // If current request is a web activity, handle it
    if (location.hash && location.hash === "#activity") {
        navigator.mozSetMessageHandler('activity', function(activityRequest) {
            options.activityRequest = activityRequest;

            app(options).load("home");
        });
    }
    // else, just trigger it normally
    else {
        app(options).load("home");
    }

});
