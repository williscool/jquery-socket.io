$(document).ready( function () {

	var jqSH = $.socketio();
	
    // greet the user on their console
	$(jqSH).bind('greeting', function(event, message){
		
		if(window.console) console.log(message);
	
	});
	
	//the server is calling the client
	$(jqSH).bind('calling', function(event, message){

		var messageContainer = $("div#message");

		if (messageContainer.length) {
			
			messageContainer.effect("pulsate", { times:6 }, 1500);
			messageContainer.text(message);
		
		}

	});

});
