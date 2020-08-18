// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));
const port = 3000;


// Setup Server
const server = app.listen(port, listening);
// Callback to debug
function listening() {
    console.log("server running");
    console.log("running on localhost: 3000");
    console.log("You did it! :) ");
};

// Initialize all route with a callback function
app.get('/all', sendData);
// Callback function to complete GET '/all'
function sendData(req, res) {
    res.send(projectData);
}
// Post Route

app.post("/add", postData);

function postData(req, res) {
    console.log(req.body);
    console.log(res.body);

    let postEntry = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }

    projectData.test = postEntry;
    console.log("Finished Call");
    res.send("dfhgj")
}
