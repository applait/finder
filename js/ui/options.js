(function () {

    // Add behaviour for option buttons
    app(function (api) {

        var resetbtn = document.querySelector("#resetbtn");

        resetbtn.addEventListener("click", function () {
            api.reset();
        }, false);

        // Perform additional UI cleanup when reset is called
        api.on("reset", function () {
            api.args.searchinput.value = "";
        });
    });
})();
