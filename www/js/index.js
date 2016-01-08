var userLastChoise;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	refresh(true);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};

function refresh(isFirstRefresh) {
	getCategories(false);
	getProducts(userLastChoise);
}

function getCategories(isNotFirstRefresh) {
	if (isNotFirstRefresh) {
		window.open('#panel-1', false);
	}
	$.getJSON("http://79.124.64.217:8080/ProductMarketWEB/rest/categories", function(data) {
        $("#categoryMainPage").empty();
        var items = [];
        $.each(data, function(key, val) {
           items.push("<li><a onclick=\"getProducts(" + "'" + val.name +  "'" +  ")\">" + val.name +"</a></li>");
        });
        $("#categoryMainPage").append(items);
        $("#categoryMainPage").listview("refresh");				
	});
	
}

function getProducts(category) {
	userLastChoise = category;
	window.open('#page-1', false);
	$.getJSON("http://79.124.64.217:8080/ProductMarketWEB/rest/products/category/" + category, function(data) {
        $("#productsMainPage").empty();
        var items = [];
        $.each(data, function(key, val) {
        	items.push("<li>");
        	items.push("<img src=" + val.images[0].url + "style=\" width: 35%; height: 35%;\">");
        	items.push("<br>");
        	items.push(val.name);
        	items.push("<br>");
        	items.push("price: " + val.price);
        	
        });
        $("#productsMainPage").append(items);
        $("#productsMainPage").listview("refresh");				
	});
}


app.initialize();
