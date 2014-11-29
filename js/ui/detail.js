(function () {

    app(function (api) {

        api.on("load:detail", function (path) {

            var result = path.split("/")[1] && api.searchResults[path.split("/")[1]],
                tmpl = $("#tmpl-detail").innerHTML.trim();

            $("#detail section").innerHTML = riot.render(tmpl, {
                name: result.fileinfo.name,
                path: result.fileinfo.path,
                size: result.file.size ? Math.round(result.file.size / 1000) + " KB" : "Unknown",
                modified: result.file.lastModifiedDate ? result.file.lastModifiedDate.toDateString() : "Unknown",
                icontype: api.iconclass(result.file.type),
                i: path.split("/")[1]
            });

            // Memory cleanup
            result = tmpl = null;

        });

    });

})();
