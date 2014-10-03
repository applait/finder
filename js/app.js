window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    var searchform = $("#searchform"),
        searchbox = $("#searchbox"),
        searchsubmit = $("#searchsubmit"),
        resultsbox = $("#resultsbox"),
        wobblebar = $(".wobblebar"),
        results = [],
        finder = new Applait.Finder({type: "sdcard", minSearchLength: 2, debugMode: true});

    /**
     * Trigger search
     */
    var searchtrigger = function (event) {
        event.preventDefault();

        searchbox.val(searchbox.val().trim()).blur();
        finder.search(searchbox.val());
    };


    finder.events.addListener("empty", function (needle) {
        wobblebar.addClass("hide");
        resultsbox.append($("<li><p><em>No results found.</em></p></li>"));
    });

    finder.events.on("fileFound", function (file, fileinfo, storageName) {
        results.push({ file: file, fileinfo: fileinfo, storageName: storageName });
    });

    finder.events.on("searchBegin", function (needle) {
        results = [];
        resultsbox.html("");
    });

    finder.events.on("storageSearchBegin", function (storageName, needle) {
        wobblebar.removeClass("hide");
    });

    finder.events.on("searchComplete", function (storageName, needle, filematchcount) {
        results.length && results.forEach(function (result, i) {
            var resultitem = $("<li></li>").attr({
                "data-file" : result.file.name,
                "data-type" : result.file.type,
                "data-storage": result.storageName,
                "data-result-index": i,
                "class" : "resultitem panel"
            });
            resultitem.append($("<h4>" + result.fileinfo.name + "</h4><small>" + result.fileinfo.path + "</small>"));
            resultsbox.append(resultitem);
        });

        $(".resultitem").bind("click", function (event) {
            var activityname = "open";

            if ($.inArray($(this).attr("data-type"), ["application/pdf"]) > -1) {
                activityname = "view";
            }

            var activity = new MozActivity({
                name: activityname,
                data: {
                    type: $(this).attr("data-type"),
                    blob: results[$(this).attr("data-result-index")].file
                }
            });
        });

        wobblebar.addClass("hide");
    });

    /**
     * Bind search trigger to search form submit
     */
    searchform.bind("submit", searchtrigger);
    searchsubmit.bind("click", searchtrigger);

    /**
     * UI sweetness
     */
    searchbox.focus();
    $("#menu-btn").bind("click", function (event) {
        event.preventDefault();
        searchbox.blur();
        document.querySelector("x-flipbox").toggle();
    });

    $("#reset-btn").bind("click", function (event) {
        event.preventDefault();
        searchbox.val("");
        results = [];
        resultsbox.html("");
        searchbox.focus();
    });
});
