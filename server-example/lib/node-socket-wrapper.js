io = require('socket.io'),
events = require('events'),
util = require('util');


var socketHandler = function(app){
	
        var self = this;

	events.EventEmitter.call(this);
 
      self.app = app;

	self.socket = io.listen(self.app);

};

util.inherits(socketHandler , events.EventEmitter);
 
socketHandler.prototype._trigger = function(event, data) {

	var self = this;

	self.socket.once('connection', function(client){
	  // Success!  Now listen to messages to be received
//          client.sendAnnouncement('Hello client');
	 	self.client = client;
	  client.on('message', function(message){
		
	 	client.send({ "event" : event, "data" : data});
                /* comback for auth later 
                if we have session.sockettoken. which will change with every correct auth 
        
                if(!message.sid) {
		
                	return;
		} */
        
                if(message.event != undefined) {
                        self.emit(message.event, message.data);
                }                 

	  });

	  client.on('disconnect',function(){
	  });

	});

};
 
socketHandler.prototype.greeting = function(text) {
    this._trigger('greeting', text);
};
 
socketHandler.prototype.calling = function(msg) {
    this._trigger('calling', msg);
};

socketHandler.prototype.gotDigits = function(num) {
    this._trigger('gotDigits', num);
};

socketHandler.prototype.callended = function(time) {
    this._trigger('callended', time);
};

socketHandler.prototype.newEvent = function(ev,msg) {
    this._trigger(ev,msg);
};

socketHandler.prototype.sendTime = function(time) {
    this._trigger('sendTime', time);
};


exports.socketHandler = socketHandler;

exports.config = function(app) {

	return new socketHandler(app);

};
