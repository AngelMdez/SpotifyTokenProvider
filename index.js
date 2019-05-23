var request = require('request');
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/token', function(req, resp) {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers', 'X-Requested-With');

  var client_id = "d00a707873a040e8bc620e8ce9a77ca1";
  var client_secret = "380efea1441642dab0bf913a6db7f729";

  var requestdata = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64')
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(requestdata, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      resp.json({ token: body.access_token });
      console.log("Enviando token...")
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
