window.addEventListener("DOMContentLoaded", function () {

    var searchinput = "#topnav-input";

    // Initiate the app with a config. This will instantiate the api and invoke all
    // module registrations
    app({
        path: location.hash ? location.hash.slice(2) : "home",
        root: document.querySelector("body"),
        topnav: "#topnav",
        bottomnav: "#bottomnav",
        searchinput: searchinput,
        searchbtn: "#searchbtn",
        cancelbtn: "#cancelbtn",
        resetbtn: "#resetbtn",
        debug: true
    });

    // Set focus on the searchinput
    document.querySelector(searchinput).focus();

});
