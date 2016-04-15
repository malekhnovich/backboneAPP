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
	},
	events:{
		'click #add-button': 'addButtonClick'
	},
	addButtonClick: function(e) {
//have to also insert method to change view to addView
		console.log("Add button has been clicked");

	}
});

var AddView = Backbone.View.extend({
	el: 'body',
	template: _.template($('#add-view').html()),
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template());
		/*Books.each(function(model) {
			var book = new BookView({
				model: model
			});
			this.$('ul').append(book.render().el);
		}.bind(this));*/
		return this;
	},
	events:{
		'click #save-button': 'saveButtonClick'
	},
	//method still needs work
	saveButtonClick: function(e) {
		var title, author, isbn;
		e.preventDefault();
		title = +this.$('#title-input').val();
		author = +this.$('#author-input').val();
		console.log("Save button has been clicked");

		if (title && author) {
			book = new Book({title: title, author: author,isbn:isbn});
			this.collection.add(book);
			this.$('#title-input').val('');
			this.$('#author-input').val('');
			console.log(book);

		}

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
// Launch app
var app = new AddView;
