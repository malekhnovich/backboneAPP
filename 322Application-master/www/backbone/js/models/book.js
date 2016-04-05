
/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// book attributes are title, author, and ISBN number
	app.Book = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			title: '',
			author: '',
			isbn: '',
			getGive: false
		}
	});
})();