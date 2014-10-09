window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    var searchform = $("#searchform"),
        searchbox = $("#searchbox"),
        searchsubmit = $("#searchsubmit"),
        resultsbox = $("#resultsbox"),
        wobblebar = $(".wobblebar"),
        results = [],
        finder = new Applait.Finder({type: "sdcard", minSearchLength: 2, debugMode: true}),
        searchcompletecount = 0,
        totalfilematchcount = 0;

    var isactivity = false;

    /**
     * Now, handle activities
     */
    navigator.mozSetMessageHandler('activity', function(activityRequest) {
        var option = activityRequest.source;

        isactivity = true;

        resetsearch();
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

    /**
     * Reset search environment
     */
    var resetsearch = function () {
        cleanupsearch();
        stopprogress();
        resultsbox.append($("<li><p class='hint'><em>Type your query in the Search box (e.g., <code>jpg</code>), and press <code>Go</code>.</em></p></li>"));
        if (typeof $("x-flipbox").attr('flipped') !== "undefined") {
            document.querySelector("x-flipbox").toggle();
        }
        searchbox.val("").focus();
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
        resultsbox.append($("<li><p>Searching for <code>" + needle + "</code><br>" +
                            "This may take some time...</p></li>"));
        startprogress();
    });

    finder.events.on("searchComplete", function (storageName, needle, filematchcount) {

        searchcompletecount++;
        totalfilematchcount += filematchcount;

        if (searchcompletecount >= finder.storages.length) {

            if (isactivity) {
                resultsbox.html("<li class='status'><p><em>" + totalfilematchcount + " file(s) matched. " +
                                "[Hint: Tap to pick.]</em></p></li>");
            } else {
                resultsbox.html("<li class='status'><p><em>" + totalfilematchcount + " file(s) matched</em></p></li>");
            }

            results.length && results.forEach(function (result, i) {
                var resultitem = $("<li></li>").attr({
                    "data-file" : result.file.name,
                    "data-type" : result.file.type,
                    "data-storage": result.storageName,
                    "data-result-index": i,
                    "class" : "resultitem panel"
                });
                resultitem.append($("<div class='resultitem-item col'><h4>" + result.fileinfo.name + "</h4>" +
                                    "<p class='small folderpath'>" + result.fileinfo.path + "</p></div>"));
                resultitem.append($("<div class='resultitem-preview col'><p>View</p></div>"));
                resultsbox.append(resultitem);
            });

            $(".resultitem .resultitem-item").bind("click", function (event) {
                var parent = $(this).parent();
                $(".resultitem").removeClass("active");
                parent.addClass("active");
                if (isactivity) {
                    $(document).trigger("finderFilePicked", [results[parent.attr("data-result-index")].file]);
                }
            });

            $(".resultitem .resultitem-preview").bind("click", function (event) {
                var activityname = "open",
                    parent = $(this).parent();

                $(".resultitem").removeClass("active");
                parent.addClass("active");

                if ($.inArray(parent.attr("data-type"), ["application/pdf"]) > -1) {
                    activityname = "view";
                }

                var activity = new MozActivity({
                    name: activityname,
                    data: {
                        type: parent.attr("data-type"),
                        blob: results[parent.attr("data-result-index")].file
                    }
                });
            });

            stopprogress();

            if(!totalfilematchcount) {
                resultsbox.html($("<li><p><em>No results found.</em></p></li>"));
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
    resetsearch();

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
        resetsearch();
    });
});
