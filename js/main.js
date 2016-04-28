// Book model
var Book = Backbone.Model.extend({
	defaults: {
		title: '',
		author: '',
		isbn: ''
	},
	validate: function() {
		//console.log(this.title);
		if(!this.attributes.title) {
			return 'Please enter a title.';
		} else if(!this.attributes.author) {
			return 'Please enter an author';
		} else if(!this.attributes.isbn) {
			return 'Please enter an ISBN';
		} else if(isNaN(this.attributes.isbn) || this.attributes.isbn.length != 13) {
			return 'Please enter a valid ISBN-13.';
		} else {
			return false;
		}
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
	model: Book,
	localStorage: new Backbone.LocalStorage('bookStore')
});

// Create new instance of BooksCollection
// and add three model instances to it.
var Books = new BooksCollection;
Books.fetch();
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
		app.navigate('#add', {trigger: true});
		window.location.reload();
		//window.location.reload();
	},
	deleteBook: function() {

	},
	initialize: function() {
		this.render();
	},
	render: function() {
		document.title = 'Books';
		this.$el.html(this.template());
		Books.each(function(model) {
			var book = new BookView({
				model: model
			});
			this.$('ul').append(book.render().el);
		}.bind(this));
		this.$el.append('<p>'+Books.length+' books</p>');
		return this;
	}
});

var AddView = Backbone.View.extend({
	el: 'body',
	template: _.template($('#add-view').html()),
	events: {
		'click #cancel': 'showListView',
		'submit form': 'saveBook'
	},
	showListView: function() {
		app.navigate('', {trigger: true});
		window.location.reload();
	},
	saveBook: function(e) {
		e.preventDefault();
		//console.log($('#title').val());
		var book = new Book({
			title: $('#title').val(),
			author: $('#author').val(),
			isbn: $('#isbn').val()
		});
		//console.log(book.attributes.title);
		error = book.validate();
		//console.log(book.title);
		if(error) {
			this.$el.append('<p>' + error + '</p>');
		} else {
			Books.add(book);
			book.save();
			app.navigate('', {trigger: true});
			window.location.reload();
		}
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		document.title = 'Add';
		this.$el.html(this.template());
		return this;
	}
});

// Create Book View
var BookView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#book-template').html()),
	events: {
		'click .delete': 'deleteBook',
	},
	deleteBook: function() {
		console.log('deleting');
		this.model.destroy();
		app.navigate('', {trigger: true});
		window.location.reload();
	},
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});

var AppRouter = Backbone.Router.extend({
	routes: {
		"": 'listView',
		"listView":"listView",
		"add": 'addView'
	},
	addView: function() {
		new AddView();
	},
	listView: function() {
		new ListView();
	}

});


// Launch app
var app = new AppRouter();
Backbone.history.start();

