// Book model
var Book = Backbone.Model.extend({
	defaults: {
		title: '',
		author: '',
		isbn: '',
		added: new Date
	},
	validate: function() {
		//console.log(this.title);
		//isbnPattern = /(97(?:8|9)([ -]?)(?=\d{1,5}\2?\d{1,7}\2?\d{1,6}\2?\d)(?:\d\2*){9}\d)/;
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

var GetBook = Book.extend();
var GiveBook = Book.extend();

// New instance of Book model - book1
var book1 = new GetBook({
	title: 'Information Retrieval in Practice',
	author: 'Bruce Croft, Don Metzlet, and Trevor Strohe',
	isbn: '9783869104567'
});

// New instance of Book model - book2
var book2 = new GetBook({
	title: 'Murach\'s PHP and MySQL Second Edition',
	author: 'Joel Murach and Ray Harris',
	isbn: '9789164793427'
});

// New instance of Book model - book3
var book3 = new GetBook({
	title: 'Successful Project Management',
	author: 'Jack Gido and James Clements',
	isbn: '9782275591745'
});

// New instance of Book model - book1
var book4 = new GiveBook({
	'title': 'Cognitive Science: An Introduction to the Study of the Mind',
	'author': 'Jay Friedenberg and David Silverman',
	'isbn': '9781593275846'
});

// New instance of Book model - book2
var book5 = new GiveBook({
	'title': 'About Face: The Essentials of Interaction Design',
	'author': 'Alan Cooper, Robert Reimann, and David Cronin',
	'isbn': '978890774790'
});

// New instance of Book model - book3
var book6 = new GiveBook({
	'title': 'System Analysis & Design',
	'author': 'Alan Dennis and Barbara Haley Wixom',
	'isbn': '9781118037421'
});

// Create Books Collection
var GetBooksCollection = Backbone.Collection.extend({
	model: GetBook,
	localStorage: new Backbone.LocalStorage('getBooks'),
});
var GiveBooksCollection = Backbone.Collection.extend({
	model: GiveBook,
	localStorage: new Backbone.LocalStorage('giveBooks'),
});

// Create new instance of BooksCollection
// and add three model instances to it.
var getBooks = new GetBooksCollection;
getBooks.fetch();
getBooks.add(book1);
getBooks.add(book2);
getBooks.add(book3);

var giveBooks = new GiveBooksCollection;
giveBooks.fetch();
giveBooks.add(book4);
giveBooks.add(book5);
giveBooks.add(book6);

var MatchesView = Backbone.View.extend({
	el: 'body',
	template: _.template($('#matches-view').html()),
	initialize: function() {
		this.render();
	},
	render: function() {
		document.title = 'Matches';
		this.$el.html(this.template());

		return this;
	}
});
var GetListView = Backbone.View.extend({
	el: 'body',
	template: _.template($('#get-list-view').html()),
	events: {
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		document.title = 'Get Books';
		this.$el.html(this.template());
		getBooks.each(function(model) {
			var book = new BookView({
				model: model
			});
			this.$('ul').append(book.render().el);
		}.bind(this));

		return this;
	}
});
var GiveListView = Backbone.View.extend({
	el: 'body',
	template: _.template($('#give-list-view').html()),
	events: {
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		document.title = 'Give Books';
		this.$el.html(this.template());
		giveBooks.each(function(model) {
			var book = new BookView({
				model: model
			});
			this.$('ul').append(book.render().el);
		}.bind(this));

		return this;
	}
});
var GetAddView = Backbone.View.extend({
	el: 'body',
	template: _.template($('#get-add-view').html()),
	events: {
		'click #save': 'triggerSubmit',
		'submit form': 'saveBook'
	},
	triggerSubmit: function() {
		$('form').trigger('submit');
	},
	saveBook: function(e) {
		e.preventDefault();
		var book = new GetBook({
			title: $('#title').val(),
			author: $('#author').val(),
			isbn: $('#isbn').val()
		});
		error = book.validate();
		if(error) {
			this.$('form + p').html(error);
		} else {
			getBooks.add(book);
			book.save();
			app.navigate('get', {trigger: true});
		}
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		document.title = 'Add Book';
		this.$el.html(this.template());

		return this;
	}
});
var GiveAddView = Backbone.View.extend({
	el: 'body',
	template: _.template($('#give-add-view').html()),
	events: {
		'click #save': 'triggerSubmit',
		'submit form': 'saveBook'
	},
	triggerSubmit: function() {
		$('form').trigger('submit');
	},
	saveBook: function(e) {
		e.preventDefault();
		var book = new GiveBook({
			title: $('#title').val(),
			author: $('#author').val(),
			isbn: $('#isbn').val()
		});
		error = book.validate();
		if(error) {
			this.$('form + p').html(error);
		} else {
			giveBooks.add(book);
			book.save();
			app.navigate('give', {trigger: true});
		}
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		document.title = 'Add Book';
		this.$el.html(this.template());

		return this;
	}
});
var GetEditView = Backbone.View.extend({
	el: 'body',
	template: _.template($('#get-edit-view').html()),
	events: {
		'click #save': 'triggerSubmit',
		'submit form': 'saveBook',
		'click #delete': 'deleteBook'
	},
	deleteBook: function() {
		this.model.destroy();
		app.navigate('get', {trigger: true});
	},
	triggerSubmit: function() {
		$('form').trigger('submit');
	},
	saveBook: function(e) {
		e.preventDefault();
		var book = new GetBook({
			title: $('#title').val(),
			author: $('#author').val(),
			isbn: $('#isbn').val()
		});
		error = book.validate();
		if(error) {
			this.$('form + p').html(error);
		} else {
			getBooks.add(book);
			book.save();
			app.navigate('get', {trigger: true});
		}
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		document.title = 'Edit Book';
		this.$el.html(this.template());

		return this;
	}
});
var GiveEditView = Backbone.View.extend({
	el: 'body',
	template: _.template($('#give-edit-view').html()),
	events: {
		'click #save': 'triggerSubmit',
		'submit form': 'saveBook',
		'click #delete': 'deleteBook'
	},
	deleteBook: function() {
		this.model.destroy();
		app.navigate('give', {trigger: true});
	},
	triggerSubmit: function() {
		$('form').trigger('submit');
	},
	saveBook: function(e) {
		e.preventDefault();
		var book = new GiveBook({
			title: $('#title').val(),
			author: $('#author').val(),
			isbn: $('#isbn').val()
		});
		error = book.validate();
		if(error) {
			this.$('form + p').html(error);
		} else {
			giveBooks.add(book);
			book.save();
			app.navigate('give', {trigger: true});
		}
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		document.title = 'Edit Book';
		this.$el.html(this.template());

		return this;
	}
});
var SettingsView = Backbone.View.extend({
	el: 'body',
	template: _.template($('#settings-view').html()),
	initialize: function() {
		this.render();
	},
	render: function() {
		document.title = 'Settings';
		this.$el.html(this.template());

		return this;
	}
});
var BookView = Backbone.View.extend({
	tagName: 'a',
	template: _.template($('#book-view').html()),
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});

var AppRouter = Backbone.Router.extend({
	routes: {
		'': 'matchesView',
		'get': 'getListView',
		'give': 'giveListView',
		'get/add': 'getAddView',
		'give/add': 'giveAddView',
		'get/edit/:id': 'getEditView',
		'give/edit/:id': 'giveEditView',
		'settings': 'settingsView'
	},
	matchesView: function() {
		new MatchesView();
	},
	getListView: function() {
		new GetListView();
	},
	giveListView: function() {
		new GiveListView();
	},
	getAddView: function() {
		new GetAddView();
	},
	giveAddView: function() {
		new GiveAddView();
	},
	getEditView: function() {
		new GetEditView();
	},
	giveEditView: function() {
		new GiveEditView();
	},
	settingsView: function() {
		new SettingsView();
	}

});


// Launch app
var app = new AppRouter();
Backbone.history.start();
