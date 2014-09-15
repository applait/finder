window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    var searchform = document.getElementById("searchform"),
        searchbox = document.getElementById("searchbox"),
        resultsbox = document.getElementById("resultsbox"),
        finder = new Applait.Finder({type: "sdcard"});

    /**
     * Trigger search
     */
    var searchtrigger = function (event) {
        event.preventDefault && event.preventDefault();
        event.returnValue = false;

        searchbox.value = searchbox.value.trim();

        finder.search(searchbox.value);

    };


    finder.events.addListener("empty", function (needle) {
        // TODO: add handler for empty storage
    });

    finder.events.on("fileFound", function (file, fileinfo, storageName) {
        var newelem = document.createElement("div");
        newelem.innerHTML = "<p>" + fileinfo.name + "</p><small>" + fileinfo.path + "</small>";
        resultsbox.appendChild(newelem);
    });

    finder.events.on("searchBegin", function (needle) {
        resultsbox.innerHTML = "";
    });

    finder.events.on("storageSearchBegin", function (storageName, needle) {
        // TODO: add handler for storage search
    });

    finder.events.on("searchComplete", function (storageName, needle, filematchcount) {
        resultsbox.innerHTML = "<p><strong>Files found in '" + storageName + "' storage: " + filematchcount +
            "</strong></p>" + resultsbox.innerHTML;
    });

    /**
     * Bind search trigger to search form submit
     */
    searchform.addEventListener("submit", searchtrigger, false);
    searchform.querySelector("#searchsubmit").addEventListener("click", searchtrigger, false);

});
