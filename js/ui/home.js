(function () {

    app(function (api) {

        // Load stock home on first app load
        api.one("load:home", function () {
            $("#home section").innerHTML = riot.render($("#tmpl-home-stock").innerHTML.trim());
            $(api.args.searchinput) && $(api.args.searchinput).focus();
        });

        api.finder.on("searchBegin", function (key) {
            $("#home section").innerHTML = riot.render($("#tmpl-loading").innerHTML.trim(), { searchkey: key });
        });

        api.on("resultsFound", function () {

            var itemtmpl = $("#tmpl-searchresult-item").innerHTML.trim(),
                listtmpl = $("#tmpl-searchresults").innerHTML.trim(),
                searchresults = "";

            api.searchResults.forEach(function (item, idx) {
                searchresults += riot.render(itemtmpl, {i: idx, name: item.fileinfo.name});
            });

            $("#home section").innerHTML = riot.render(listtmpl, {
                filecount: api.finder.filematchcount,
                searchkey: api.finder.searchkey,
                searchresults: searchresults
            });
        });

        api.on("noResults", function (key) {
            $("#home section").innerHTML = riot.render($("#tmpl-noresults").innerHTML.trim(), {
                searchkey: key
            });
        });
    });

})();
