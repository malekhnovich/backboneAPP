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

var Give_Books=Backbone.Model.extend({
	defaults:{
		title:'',
		author:'',
		isbn:''
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
var book2 = new Give_Books({
	title: 'Murach\'s PHP and MySQL Second Edition',
	author: 'Joel Murach and Ray Harris',
	isbn: '978-9164793427'
});

// New instance of Book model - book3
var book3 = new Give_Books({
	title: 'Successful Project Management',
	author: 'Jack Gido and James Clements',
	isbn: '978-2275591745'
});

var stranger_give=new Book({
	title:'Information Retrieval in Practice',
	author:'Bruce Croft, Don Metzlet, and Trevor Strohe',
	isbn:'978-3869104567'
});

var stranger_get=new Book({
	title: 'Successful Project Management',
	author: 'Jack Gido and James Clements',
	isbn: '978-2275591745'
});

console.log(stranger_get.attributes);

// Create Books Collection
var BooksCollection = Backbone.Collection.extend({
	model: Book,

	localStorage: new Backbone.LocalStorage('bookStore')


});
var BooksGivenCollection=Backbone.Collection.extend({
	model:Give_Books,
	localStorage:new Backbone.LocalStorage('BookGivenStore')
});

// Create new instance of BooksCollection

var Books = new BooksCollection;
Books.fetch();
Books.add(book1);

var Books_Given=new BooksGivenCollection;
Books_Given.fetch();
Books_Given.add(book2);
Books_Given.add(book3);


var ListView = Backbone.View.extend({
	el: '#container',
	template: _.template($('#list-view').html()),
	events: {
		'click #add': 'addView',
		'click #give':'giveView',
		'click #matches':'matchView'
	},
	addView: function () {
		app.navigate('#add', {trigger: true});
		window.location.reload();
		//window.location.reload();
	},
	giveView:function(){

	app.navigate('#give',{trigger:true});
		window.location.reload();
	},
	matchView:function(){

		app.navigate('#match',{trigger:true});
		window.location.reload();

	},
	deleteBook: function() {
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
		this.$el.append('<p>'+Books.length+' books</p>');
		return this;
		window.location.reload();
	}
});
//ADD FOR GET
var AddView = Backbone.View.extend({
	el: '#container',
	template: _.template($('#add-view').html()),
	events: {
		'click #back': 'showListView',
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

		return this;
	},
	initialize: function() {
		this.render();
		this.$el.append('<p>Get'+'</p>');
	},
	render: function() {
		this.$el.html(this.template());
		return this;
	}
});
//VIEW FOR GIVE
var GiveView = Backbone.View.extend({
	el: '#container',
	template: _.template($('#giveView').html()),
	events: {

		'click #give-button': 'giveAdd'
	},
	giveAdd: function () {
		console.log("give add has been clicked");
		app.navigate('#give-add', {trigger: true});
		window.location.reload();

	},
	deleteBook: function() {

	},
	initialize: function() {
		this.render();

	},
	render: function() {
		this.$el.html(this.template());
		Books_Given.each(function(model) {
			var book_given = new BookView({
				model: model
			});
			this.$('ul').append(book_given.render().el);
		}.bind(this));
		this.$el.append('<p>'+Books_Given.length+' books</p>');
		return this;


		},


	refresh: function() {

		setTimeout(function () {
			location.reload()
		}, 100);
	}
});
//ADD VIEW FOR GIVE
var GiveAdd = Backbone.View.extend({
	el: '#container',
	template: _.template($('#give-add').html()),
	events: {
		'click #giveView': 'showGiveView',
		'submit form': 'saveBook'
	},
	showGiveView: function() {
		app.navigate('#give', {trigger: true});
		console.log("SHowing give view");
		window.location.reload(true);
	},
	saveBook: function(e) {
		e.preventDefault();
		//console.log($('#title').val());
		var given_book = new Give_Books({
			title: $('#title').val(),
			author: $('#author').val(),
			isbn: $('#isbn').val()
		});
		//console.log(book.attributes.title);
		error = given_book.validate();
		//console.log(book.title);
		if(error) {
			this.$el.append('<p>' + error + '</p>');
		} else {
			Books_Given.add(given_book);
			given_book.save();
			app.navigate('#give', {trigger: true});
			window.location.reload();
		}
		return this;
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
	events: {
		'click .delete': 'deleteBook'
	},
	deleteBook: function() {
		console.log('deleting');
		this.model.destroy();
		app.navigate('', {trigger: true});
		window.location.reload();
	},
	render: function() {
		//console.log(this.model);
		this.$el.html(this.template(this.model.attributes));

		return this;
	}
});
var matchView = Backbone.View.extend({
	el: '#container',
	template: _.template($('#match-view').html()),
	events: {
		//'click #add': 'addView',
		'click #get':'listView',
		'click #give':'giveView'
			},
	/**addView: function () {
		app.navigate('#add', {trigger: true});
		window.location.reload();
		//window.location.reload();
	},**/

	giveView:function(){

		app.navigate('#give',{trigger:true});
		window.location.reload();
	},
	listView:function(){
	app.navigate('',{trigger:true});
		window.location.reload();
	},

	initialize: function() {
		this.render();
	},
	render: function() {
				console.log("match view");
			$(this.el).html(this.template(this.model));
			return this;

	},
	reload:function(){
		window.location.reload();
	}
	});



var AppRouter = Backbone.Router.extend({
	routes: {
		"": 'listView',
		"listView":"listView",
		"add": 'addView',
		"give":'giveView',
		"give-add":'giveAdd',
		"matches":'matchView'
	},
	addView: function() {
		console.log("AddView");
		new AddView();
	},
	listView: function() {
		console.log("ListView");
		new ListView();

	},
	giveView:function(){
		console.log("Give View");

		new GiveView();

	},
	giveAdd:function(){
		console.log("Give Add Screen");
		new GiveAdd();
	},
	matchView:function(){
		console.log("Match Screen");
		new matchView();
	}


});


// Launch app
var app = new AppRouter();
Backbone.history.start();

