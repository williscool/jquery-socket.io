io = require('socket.io'),
events = require('events'),
util = require('util');


var socketHandler = function(app){
	
    events.EventEmitter.call(this);
    
    var self = this;

    self.app = app;

    self.socket = io.listen(self.app);

    self.socket.on('connection', function(client){   
        // Success!  Now listen to messages to be received

        self.client = client;

        self.seh = new socketEventHandler(self.client);

        self.emit('gotClient', self.seh );

        client.on('message', function(message){

            if(message.event != undefined) {
                    self.emit(message.event, message.data);
            }                 

        });

        client.on('disconnect',function(){

        });
        
    });

};


util.inherits(socketHandler, events.EventEmitter);


exports.socketHandler = socketHandler;

var socketEventHandler = module.exports.socketEventHandler = function(client){

    events.EventEmitter.call(this);

    this.client = client;
};

util.inherits(socketEventHandler, events.EventEmitter);
 
socketEventHandler.prototype._trigger = function(event, data) {
 
    this.client.send({ "event" : event, "data" : data});
};
 
socketEventHandler.prototype.greeting = function(text) {
    this._trigger('greeting', text);
};
 
socketEventHandler.prototype.calling = function(msg) {
    this._trigger('calling', msg);
};

socketEventHandler.prototype.gotDigits = function(num) {
    this._trigger('gotDigits', num);
};

socketEventHandler.prototype.callended = function(time) {
    this._trigger('callended', time);
};

socketEventHandler.prototype.newEvent = function(ev,msg) {
    this._trigger(ev,msg);
};

socketEventHandler.prototype.sendTime = function(time) {
    this._trigger('sendTime', time);
};


exports.config = function(app) {

    return new socketHandler(app);

};
