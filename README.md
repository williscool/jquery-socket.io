# jquery-socket.io

    
    $(document).ready( function () {

            var jqSH = $.socketHandler();

                // greet the user on their console
                    $(jqSH).bind('greeting', function(event, message){

                                if(window.console) console.log(message);

                });
                        
    });


## Repository Layout

the wrapper branch show how it works behind the scenes 

the master or plugin branch allows you to just include and go


## Usage

there is both a client and a (node.js) server example in this repository to help you get started


## Credits

client code and parts of the server code inspired by this article

http://spiritconsulting.com.ar/fedex/2010/11/events-with-jquery-nodejs-and-socket-io/

Parts of the client depend on [`express`](http://expressjs.com).
