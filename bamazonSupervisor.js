//THIS IS NOT COMPLETE    PLACEHOLDER CODE TO PLAY AROUND WITH HOW TO CREATE THIS CONCEPT
//THIS IS NOT COMPLETE    PLACEHOLDER CODE TO PLAY AROUND WITH HOW TO CREATE THIS CONCEPT
//THIS IS NOT COMPLETE    PLACEHOLDER CODE TO PLAY AROUND WITH HOW TO CREATE THIS CONCEPT
//THIS IS NOT COMPLETE    PLACEHOLDER CODE TO PLAY AROUND WITH HOW TO CREATE THIS CONCEPT

var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazon'
});

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
