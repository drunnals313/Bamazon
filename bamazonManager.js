//THIS IS NOT COMPLETE    PLACEHOLDER CODE TO PLAY AROUND WITH HOW TO CREATE THIS CONCEPT
//THIS IS NOT COMPLETE    PLACEHOLDER CODE TO PLAY AROUND WITH HOW TO CREATE THIS CONCEPT
//THIS IS NOT COMPLETE    PLACEHOLDER CODE TO PLAY AROUND WITH HOW TO CREATE THIS CONCEPT
//THIS IS NOT COMPLETE    PLACEHOLDER CODE TO PLAY AROUND WITH HOW TO CREATE THIS CONCEPT



// Dependencies
var http = require("http");
var request = require('request');

var val = process.argv[2];


var PORT = 8080;

var server = http.createServer(handleRequest);

function handleRequest(req, res) {

  // Saving the request data as a variable
  var requestData = val;

  // When the server receives data...
  req.on("data", function(data) {

    // Add it to requestData.
    requestData += data;
  });

  // When the request has ended...
  req.on("end", function() {

    // Log (server-side) the request method, as well as the data received!
    console.log("You did a", req.method, "with the data:\n", requestData);
    res.end();
  });

}

// Start our server
server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

request.post(
  'http://localhost:8080',
  { json: { key: val } },
  function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body)
      }
  }
);
