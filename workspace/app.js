var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var clickNumber = 0;
var PORT = 7771;
server.listen(PORT);

console.log("connet//////");
console.log("port:"+PORT);

app.use(express.static('public'));

app.get('/view', function (req, res) {
  res.sendfile(__dirname + '/view.html');
});

app.get('/management', function (req, res) {
  res.sendfile(__dirname + '/management.html');
});

app.get('/controller', function (req, res) {
  res.sendfile(__dirname + '/controller.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('initialize', { hello: 'world' });
  socket.on('bang', function (data) {
    console.log(data);
    clickNumber++;
    socket.broadcast.emit("countup", {num:clickNumber});
  });
  socket.on('changeTrivia', function (data) {
    socket.emit('complete', { num: clickNumber });
    console.log('changeTrivia');
    clickNumber=0;
    socket.broadcast.emit("changeScene", data);
  });
});