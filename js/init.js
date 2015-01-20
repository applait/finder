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
        activityRequest: false,
        debug: localStorage.getItem("finderDebug") ? localStorage.getItem("finderDebug") : false
        // caseSensitive: localStorage.getItem("finderCase") ? localStorage.getItem("finderCase") : false,
        // hiddenFiles: localStorage.getItem("finderHidden") ? localStorage.getItem("finderHidden") : false
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


