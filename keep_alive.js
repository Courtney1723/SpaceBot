var http = require('http');

http.createServer(function (req, res) {
  res.write("Let's Get Trippy! \nFollow Trippy Commentaries: \nhttps://www.youtube.com/channel/UCVpgH_wZiJNZSsUwMOd1d8g \n\nJoin the Trippy Club:\nhttps://tinyurl.com/TrippyClubJoin");
  res.end();
}).listen(8080);
