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
        searchform: "#searchform",
        debug: false,
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
