var http = require('http');

http.createServer(function (req, res) {
  res.write("Logged in as SpaceBot! \n");
  res.end();
}).listen(8080);
