window.addEventListener("DOMContentLoaded", function () {

    // Initiate the app with a config. This will instantiate the api and invoke all
    // module registrations
    app({
        path: location.hash ? location.hash.slice(2) : "home",
        root: $("body"),
        topnav: "#topnav",
        bottomnav: "#bottomnav",
        searchinput: "#topnav-input",
        searchbtn: "#searchbtn",
        cancelbtn: "#cancelbtn",
        resetbtn: "#resetbtn",
        searchform: "#searchform",
        debug: false
    });

    // Set focus on the searchinput
    $("#topnav-input").focus();

});
