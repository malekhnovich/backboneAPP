window.MatchView = Backbone.View.extend({
	template:_.template($('#matches').html()),
	render:function (eventName) {
		$(this.el).html(this.template());
		return this;
	}
});
window.GetView = Backbone.View.extend({
	template:_.template($('#get').html()),
	render:function (eventName) {
		$(this.el).html(this.template());
		return this;
	}
});
window.GiveView = Backbone.View.extend({
	template:_.template($('#give').html()),
	render:function (eventName) {
		$(this.el).html(this.template());
		return this;
	}
});
window.GetAddView = Backbone.View.extend({
	template:_.template($('#get-add').html()),
	render:function (eventName) {
		$(this.el).html(this.template());
		return this;
	}
});
window.GiveAddView = Backbone.View.extend({
	template:_.template($('#give-add').html()),
	render:function (eventName) {
		$(this.el).html(this.template());
		return this;
	}
});
window.GetDetailView = Backbone.View.extend({
	template:_.template($('#get-detail').html()),
	render:function (eventName) {
		$(this.el).html(this.template());
		return this;
	}
});
window.GiveDetailView = Backbone.View.extend({
	template:_.template($('#give-detail').html()),
	render:function (eventName) {
		$(this.el).html(this.template());
		return this;
	}
});
window.SettingsView = Backbone.View.extend({
	template:_.template($('#settings').html()),
	render:function (eventName) {
		$(this.el).html(this.template());
		return this;
	}
});
var AppRouter = Backbone.Router.extend({
	routes:{
		"":"matches",
		"get":"get",
		"give":"give",
		"get-add":"getAdd",
		"give-add":"giveAdd",
		"get-detail":"getDetail",
		"give-detail":"giveDetail",
		"settings":"settings"
	},
	initialize:function () {
		// Handle back button throughout the application
		$('.back').on('click', function(event) {
			window.history.back();
			return false;
		});
		this.firstPage = true;
	},
	matches:function () {
		console.log('#matches');
		this.changePage(new MatchView());
	},
	get:function () {
		console.log('#get');
		this.changePage(new GetView());
	},
	give:function () {
		console.log('#give');
		this.changePage(new GiveView());
	},
	getAdd:function () {
		console.log('#get-add');
		this.changePage(new GetAddView());
	},
	giveAdd:function () {
		console.log('#give-add');
		this.changePage(new GiveAddView());
	},
	getDetail:function () {
		console.log('#get-detail');
		this.changePage(new GetDetailView());
	},
	giveDetail:function () {
		console.log('#give-detail');
		this.changePage(new GiveDetailView());
	},
	settings:function () {
		console.log('#settings');
		this.changePage(new SettingsView());
	},
	changePage:function (page) {
		$(page.el).attr('data-role', 'page');
		page.render();
		$('body').append($(page.el));
		var transition = 'none'; //$.mobile.defaultPageTransition;
		if (this.firstPage) {
			transition = 'none';
			this.firstPage = false;
		}
		$.mobile.changePage($(page.el), {changeHash:false, transition: transition});
	}
});
$(document).ready(function () {
	console.log('document ready');
	app = new AppRouter();
	Backbone.history.start();
});