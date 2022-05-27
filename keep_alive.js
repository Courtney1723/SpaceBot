var http = require('http');

http.createServer(function (req, res) {
  res.write("Logged in as SpaceBot! \nCreated by Courtney1723");
  res.end();
}).listen(8080);



