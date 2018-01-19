var express = require('express');
var app = express();
var ResinSdk = require('resin-sdk');
var sdk;

// reply to request with "Hello World!"
app.get('/', function (req, res) {
  if (sdk) {
    // set the 'stats.lastrequest' tag but w/o blocking the response
    sdk.models.device.tags
      .set(process.env.RESIN_DEVICE_UUID, 'stats.lastrequest', Date.now())
      .catch(function(e) {
        console.error('Error while setting stats.lastrequest tag', e);
      });
  }
  res.send('Hello World!');
});

//start a server on port 80 and log its start to our console
var server = app.listen(80, function () {

  sdk = ResinSdk();
  sdk.auth.logout();
  sdk.auth.loginWithToken(process.env.RESIN_API_KEY);

  var port = server.address().port;
  console.log('Example app listening on port ', port);

});
