// Book model
var Book = Backbone.Model.extend({
	defaults: {
		title: '',
		author: '',
		isbn: ''
	}
});

// New instance of Book model - book1
var book1 = new Book({
	title: 'Information Retrieval in Practice',
	author: 'Bruce Croft, Don Metzlet, and Trevor Strohe',
	isbn: '978-3869104567'
});

// New instance of Book model - book2
var book2 = new Book({
	title: 'Murach\'s PHP and MySQL Second Edition',
	author: 'Joel Murach and Ray Harris',
	isbn: '978-9164793427'
});

// New instance of Book model - book3
var book3 = new Book({
	title: 'Successful Project Management',
	author: 'Jack Gido and James Clements',
	isbn: '978-2275591745'
});

// Create Books Collection
var BooksCollection = Backbone.Collection.extend({
	model: Book
});

// Create new instance of BooksCollection
// and add three model instances to it.
var Books = new BooksCollection;
Books.add(book1);
Books.add(book2);
Books.add(book3);

// Create Books View
var ListView = Backbone.View.extend({
	el: 'body',
	template: _.template($('#list-view').html()),
	events: {
		'click #add': 'addView'
	},
	addView: function () {
		new AddView();
		window.location.reload();
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template());
		Books.each(function(model) {
			var book = new BookView({
				model: model
			});
			this.$('ul').append(book.render().el);
		}.bind(this));
		return this;
	}
});

var AddView = Backbone.View.extend({
	el: 'body',
	template: _.template($('#add-view').html()),
	events: {
		'click #back': 'showListView'
	},
	showListView: function() {
		new ListView();
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template());
		return this;
	}
});

// Create Book View
var BookView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#book-template').html()),
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});

var AppRouter = Backbone.Router.extend({
	routes: {
		"": 'listView',
		"add": 'addView'
	},
	initialize:function () {
		//this.changePage(new ListView());
		// Handle back button throughout the application
		$('.back').on('click', function(event) {
			window.history.back();
			return false;
		});
		this.firstPage = true;
	},
	addView: function() {
		this.loadView(new AddView());
	},
	listView: function() {
		this.loadView(new ListView());
	},
	loadView: function(view) {
		this.view && this.view.remove();
		this.view = view;
	}
});


// Launch app
var app = new AppRouter;
Backbone.history.start();
