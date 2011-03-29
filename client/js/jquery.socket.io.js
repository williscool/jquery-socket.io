(function( $ ){

	$.socketHandler = function(userSID) {
		
	// Create SocketIO instance, connect
	var socket = new io.Socket();
	handler = {};

		socket.connect();

		// Add a connect listener
		socket.on('connect',function() {
			  console.log('Client has connected to the server!');
				socket.send({sid:userSID});
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

	var sid = $.cookies.get('connect.sid');

	var jqSH = $.socketHandler(sid);

	//once the user answers with their digit
	$(jqSH).bind('gotDigits', function(event, digits){

		$.cookies.set('userDigits', digits);

	});

	
	//the twilio is calling the client
	$(jqSH).bind('calling', function(event, message){

		var messageContainer = $("div#message");

		if (messageContainer.length) {
			
			messageContainer.effect("pulsate", { times:6 }, 1500);
			messageContainer.text(message);
		
		}

	});
	
	// greet the user on their console
	$(jqSH).bind('greeting', function(event, message){
		
		if(window.console) console.log(message);
	
	});

	
	// what happens when you submit the form on the logged in page	
	$("form#rootloggedin").submit(function() {
	
		$("form span").text("You clicked the button!").show().fadeOut(1000);

		var respCont = $("div.callresponse:last");
		
		// make a new element based off of the other old and ad it at the bottom	
		$(respCont).before(respCont.clone());
		
		// display the new element
		respCont.show("slow");
		
		// header for most recent 
		respCont.find('h3').text('where i would let people know they are being called');
		
		respCont.find('p').text('transcription text');
	
		return false;
	});

});
