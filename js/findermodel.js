'use strict';

/**
 * Finder Model - Main model that uses FinderJS
 *
 * @constructor
 */
var FinderModel = function (arg) {

    // Assign `this` through `riot.observable()`
    var self = riot.observable(this);

    // Create an instance of `Applait.Finder`
    self.finder = new Applait.Finder({ type: "sdcard", minSearchLength: 2, debugMode: arg.debug });

    // Current search results
    self.searchResults = [];

    /**
     * Reset all internals
     */
    self.reset = function () {
        self.searchResults = [];
    };

    /**
     * Initiate search
     *
     * @param {string} key - The search string
     */
    self.on("search", function (key) {
        self.reset();
        self.finder.search(key);
    });

    self.finder.on("fileFound", function (file) {
        self.searchResults.push(file);
    });

    self.finder.on("searchComplete", function () {
        console.log("files found after searchComplete", self.searchResults);
    });
};
