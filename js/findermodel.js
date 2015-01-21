'use strict';

/**
 * Finder Model - Main model that uses FinderJS
 *
 * @constructor
 */
var FinderModel = function (arg) {

    // Assign `this` through `riot.observable()`
    var self = riot.observable(this);

    // Store args
    self.args = arg;

    // Store current view id. Default "home".
    self.view = "home";

    // Create an instance of `Applait.Finder`
    self.finder = new Applait.Finder({
        type: "sdcard",
        minSearchLength: 2,
        debugMode: arg.debug,
        caseSensitive: arg.caseSensitive,
        hidden: arg.hiddenFiles
    });

    // Current search results
    self.searchResults = [];

    // Web activity request handler
    self.activityRequest = arg.activityRequest;

    // Store history
    self.history = [];

    // Toggle state for deciding whether to push history
    self.pushhistory = true;

    /**
     * Reset all internals
     */
    self.reset = function () {
        self.searchResults = [];
        self.history = [];
        self.finder.reset();
    };

    /**
     * Disable the reset button, search button and search input
     */
    self.ui_disable = function () {
        $(arg.resetbtn).setAttribute("disabled", true);
        $(arg.searchbtn).setAttribute("disabled", true);
        $(arg.searchinput).setAttribute("disabled", true);
    };

    /**
     * Enable the reset button, search button, search input
     */
    self.ui_enable = function () {
        $(arg.resetbtn).removeAttribute("disabled");
        $(arg.searchbtn).removeAttribute("disabled");
        $(arg.searchinput).removeAttribute("disabled");
    };

    /**
     * Initiate search
     *
     * @param {string} key - The search string
     */
    self.search = function (key) {
        self.reset();
        self.finder.search(key);
    };

    /**
     * Subscribe to Finder's fileFound event
     */
    self.finder.on("fileFound", function (file, fileinfo) {
        self.searchResults.push({ file: file, fileinfo: fileinfo });
    });

    /**
     * Subscribe to Finder's searchComplete event
     *
     * The `resultsFound` is triggered if any file is matched.
     * Else, `noResults` is triggered
     */
    self.finder.on("searchComplete", function () {
        if (self.searchResults.length && self.finder.filematchcount) {
            self.trigger("resultsFound");
        } else {
            self.trigger("noResults", self.finder.searchkey);
        }
    });

    /**
     * Provide a generic "load" method for routing
     */
    self.load = function (path) {
        self.pushhistory && self.history[self.history.length - 1] !== self.view && self.history.push(self.view);
        self.trigger("before:load", path);
        self.trigger("load:" + path.split("/")[0], path);
        self.view = path;
    };

    /**
     * Provide file type icon classes based on a mapping
     */
    self.iconclass = function (type) {
        var map = {
            "image/jpeg": "picture",
            "image/png": "picture",
            "image/gif": "picture",
            "image/bmp": "picture",
            "audio/mpeg": "video",
            "video/mp4": "videocam",
            "application/pdf": "doc"
        };

        return map[type] || "doc";
    };

};
