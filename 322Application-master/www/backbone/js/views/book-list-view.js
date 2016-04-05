
/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.BookListView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		//INSERTED 'bookapp' in the html file to match the 'el:'.bookapp'
		el: '.bookapp',
		//REMOVED STATSTEMPLATE BECAUSE IT IS UN-NECCESSARY
		// Delegated events for creating new items, and clearing completed ones.

		//OTHER EVENTS ARE IN BOOK-VIEW
		//events clear-completed and toggle-all were removed because they were not needed
		events: {
			'click .add': 'createOnEnter',
		},

		// At initialization we bind to the relevant events on the `books`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting books that might be saved in *localStorage*.
		initialize: function () {
			//REMOVED BECAUSE WE DONT HAVE A .toggle-all in our events
			//this.allCheckbox = this.$('.toggle-all')[0];
			//changed this.$(new-todo) to this.$('.add')
			this.$input = this.$('.add');
			this.$footer = this.$('.footer');
			this.$main = this.$('.main');
//NEEDS TO BE CHANGED BELOW FROM $('.todo-list)
			this.$list = $('.todo-list');
//INSTEAD OF app.books, I changed it to app.books because its the name of our collection
			this.listenTo(app.books, 'add', this.addOne);
			this.listenTo(app.books, 'reset', this.addAll);
			this.listenTo(app.books, 'change:completed', this.filterOne);
			this.listenTo(app.books, 'filter', this.filterAll);
			this.listenTo(app.books, 'all', _.debounce(this.render, 0));

			// Suppresses 'add' events with {reset: true} and prevents the app view
			// from being re-rendered for every model. Only renders when the 'reset'
			// event is triggered at the end of the fetch.
			app.books.fetch({reset: true});
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			var completed = app.books.completed().length;
			var remaining = app.books.remaining().length;

			if (app.books.length) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.statsTemplate({
					completed: completed,
					remaining: remaining
				}));

				this.$('.filters li a')
					.removeClass('selected')
					.filter('[href="#/' + (app.TodoFilter || '') + '"]')
					.addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (todo) {
			var view = new app.TodoView({ model: todo });
			this.$list.append(view.render().el);
		},

		// Add all items in the **books** collection at once.
		addAll: function () {
			this.$list.html('');
			app.books.each(this.addOne, this);
		},

		filterOne: function (todo) {
			todo.trigger('visible');
		},

		filterAll: function () {
			app.books.each(this.filterOne, this);
		},

		// If you hit return in the main input field, create new **Todo** model,
		// persisting it to *localStorage*.
		createOnEnter: function (e) {
			if (e.which === ENTER_KEY && this.$input.val().trim()) {
				app.books.create(this.newAttributes());
				this.$input.val('');
			}
		},
	});
})(jQuery);