var express = require('express');
var app = express.createServer();
var sockH = require('./lib/node-socket-wrapper').config(app);

app.set('view engine', 'jade');
app.listen(5000);


app.get("/", function (req, res){

  res.render('test.jade', {});

  setTimeout( sockH.calling('im caliing you!'), 3000);

});


app.configure('development', function(){
    app.use(express.static(__dirname + '../client'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

console.log('Express server started on port %s', app.address().port);                                                
