/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    // Todo Router
    // ---------
    var BooksRouter = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter'
        },

        setFilter: function (param) {
            // Set the current filter to be used
            app.BooksFilter = param || '';

            // Trigger a collection filter event, causing hiding/unhiding
            // of Todo view items
            app.books.trigger('filter');
        }
    });

    app.BooksRouter = new TodoRouter();
    Backbone.history.start();
})();