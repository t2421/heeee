var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(7771);

var clickNumber = 0;
function handler (req, res) {
  res.writeHead(200,{"Acees-Control-Allow-Origin":"*"});
 /* fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });*/
}

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