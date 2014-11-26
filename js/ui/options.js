(function () {

    // Add behaviour for option buttons
    app(function (api) {

        var resetbtn = document.querySelector("#resetbtn");

        resetbtn.addEventListener("click", function () {
            api.reset();
            api.args.searchinput.value = "";
            api.args.searchinput.focus();
        }, false);

    });
})();
