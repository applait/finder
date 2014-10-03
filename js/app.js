window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    var searchform = $("#searchform"),
        searchbox = $("#searchbox"),
        searchsubmit = $("#searchsubmit"),
        resultsbox = $("#resultsbox"),
        wobblebar = $(".wobblebar"),
        results = [],
        finder = new Applait.Finder({type: "sdcard", minSearchLength: 2}),
        searchcompletecount = 0,
        totalfilematchcount = 0;

    var isactivity = false;

    /**
     * Now, handle activities
     */
    navigator.mozSetMessageHandler('activity', function(activityRequest) {
        var option = activityRequest.source;
        console.log(option);
        isactivity = true;

        $("#menu-btn").html("&lt;");
        $("#menu-btn").unbind("click");
        $("#menu-btn").bind("click", function (event) {
            event.preventDefault();
            activityRequest.postError("Pick cancelled.");
        });

        if (option.name === "pick") {
            searchbox.focus();
            $(document).on("finderFilePicked", function (event, filepicked) {
                if (filepicked) {
                    activityRequest.postResult({
                        type: filepicked.type,
                        blob: filepicked
                    });
                } else {
                    activityRequest.postError("Unable to pick a file.");
                }
            });
        }
    });

    /**
     * Clean up artefacts to clear up memory
     */
    var cleanupsearch = function () {
        results = [];
        resultsbox.html("");
        searchcompletecount = 0;
        totalfilematchcount = 0;
    };

    /**
     * Interactions when search has started
     */
    var startprogress = function () {
        searchbox.attr('disabled', 'disabled');
        searchsubmit.removeClass('active');
        wobblebar.removeClass("hide");
    };

    /**
     * Interactions when search has ended
     */
    var stopprogress = function () {
        searchbox.removeAttr('disabled');
        searchsubmit.addClass('active');
        wobblebar.addClass("hide");
    };

    /**
     * Trigger search
     */
    var searchtrigger = function (event) {
        event.preventDefault();

        searchbox.val(searchbox.val().trim()).blur();
        finder.search(searchbox.val());
    };


    finder.events.addListener("searchCancelled", function () {
        cleanupsearch();
        stopprogress();
        searchbox.focus();
        wobblebar.addClass("hide");
    });

    finder.events.addListener("empty", function (needle) {
        cleanupsearch();
        stopprogress();
        searchbox.focus();
        resultsbox.append($("<li><p><em>No results found.</em></p></li>"));
    });

    finder.events.on("fileFound", function (file, fileinfo, storageName) {
        results.push({ file: file, fileinfo: fileinfo, storageName: storageName });
    });

    finder.events.on("searchBegin", function (needle) {
        cleanupsearch();
        startprogress();
    });

    finder.events.on("searchComplete", function (storageName, needle, filematchcount) {

        searchcompletecount++;
        totalfilematchcount += filematchcount;

        if (searchcompletecount >= finder.storages.length) {

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
                console.log(isactivity);
                if (isactivity) {
                    $(document).trigger("finderFilePicked", [results[$(this).attr("data-result-index")].file]);
                } else {
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
                }
            });

            stopprogress();

            if(!totalfilematchcount) {
                resultsbox.append($("<li><p><em>No results found.</em></p></li>"));
            }

            searchcompletecount = 0;
            totalfilematchcount = 0;
        }
    });

    /**
     * Bind search trigger to search form submit
     */
    searchform.bind("submit", searchtrigger);
    $(searchsubmit.selector + ".active").bind("click", searchtrigger);

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
        cleanupsearch();
        stopprogress();
        searchbox.val("").focus();
    });
});
