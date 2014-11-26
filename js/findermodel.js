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

    // Create an instance of `Applait.Finder`
    self.finder = new Applait.Finder({
        type: "sdcard",
        minSearchLength: 2,
        debugMode: arg.debug
    });

    // Current search results
    self.searchResults = [];

    /**
     * Reset all internals
     */
    self.reset = function () {
        self.searchResults = [];
        self.finder.reset();
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
    self.finder.on("fileFound", function (file) {
        self.searchResults.push(file);
    });

    /**
     * Subscribe to Finder's searchComplete event
     *
     * The `resultsFound` is triggered if any file is matched.
     * Else, `noResults` is triggered
     */
    self.finder.on("searchComplete", function () {
        if (self.searchResults.length && self.finder.filematchcount) {
            self.trigger("resultsFound", self.searchResults, self.finder.searchkey);
        } else {
            self.trigger("noResults", self.finder.searchkey);
        }
    });

};
