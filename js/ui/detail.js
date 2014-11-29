(function () {

    app(function (api) {

        api.on("load:detail", function (path) {

            var result = path.split("/")[1] && api.searchResults[path.split("/")[1]],
                tmpl = $("#tmpl-detail").innerHTML.trim();

            $("#detail section").innerHTML = riot.render(tmpl, {
                name: result.fileinfo.name,
                path: result.fileinfo.path,
                size: result.file.size,
                modified: result.file.lastModifiedDate.toDateString()
            });

            // Memory cleanup
            result = tmpl = null;

        });

    });

})();
