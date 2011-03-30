# jquery-socket.io

    
    $(document).ready( function () {

        var jqSH = $.socketio();

        // greet the user on their console
        $(jqSH).bind('greeting', function(event, message){

            if(window.console) console.log(message);

        });
                        
    });

## How it works

It binds: 

1) socket.io messages sent from the server to jquery events and  

2) jquery events fired from the browser to socket.io messages sent from the client


## Usage

there is both a client and a (node.js) server example in this repository to help you get started


## Repository Layout

the wrapper branch shows how it works behind the scenes 

the master or plugin branch allows you to just include and go


## Credits

client code and parts of the server code inspired by this article

[http://spiritconsulting.com.ar/fedex/2010/11/events-with-jquery-nodejs-and-socket-io/](http://spiritconsulting.com.ar/fedex/2010/11/events-with-jquery-nodejs-and-socket-io/)

Parts of the client depend on [`express`](http://expressjs.com).
