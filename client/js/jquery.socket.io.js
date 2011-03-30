(function( $ ){

	$.socketHandler = function() {
		
	// Create SocketIO instance, connect
	var socket = new io.Socket();
	handler = {};

		socket.connect();

		// Add a connect listener
		socket.on('connect',function() {
			  console.log('Client has connected to the server!');
		});

		socket.on('message', function(obj){

			if('event' in obj) {
			    $(handler).trigger(obj.event, obj.data);
			}
		
		    if(window.console) console.log('The '+ obj.event +' was fired.');
		});


		// Add a disconnect listener
		socket.on('disconnect',function() {
			  console.log('The server has disconnected!');
		});

		handler._trigger = function(event, data) {
			socket.send({"event" : event, "data" : data});
		}

		handler.GetTime = function() {
			handler._trigger('getTime', '');
		}
		
		handler.sendEvent = function(ev,msg) {
			handler._trigger(ev,msg);
		}

	return handler;

	}

})( jQuery );


$(document).ready( function () {

	var jqSH = $.socketHandler();
	
    // greet the user on their console
	$(jqSH).bind('greeting', function(event, message){
		
		if(window.console) console.log(message);
	
	});
	
	//the client is calling the client
	$(jqSH).bind('calling', function(event, message){

		var messageContainer = $("div#message");

		if (messageContainer.length) {
			
			messageContainer.effect("pulsate", { times:6 }, 1500);
			messageContainer.text(message);
		
		}

	});

});
