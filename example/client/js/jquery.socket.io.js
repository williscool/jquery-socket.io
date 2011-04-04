(function( $ ){

	$.socketio = function() {
		
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
