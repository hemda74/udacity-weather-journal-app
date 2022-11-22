// Setup empty JS object to act as endpoint for all routes
projectData = {};
data = {};
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 7030;
// callback function
const server = app.listen(port, ()=> {
    console.log(`Running successfuly`);
    console.log(`port = ${port}`)
});
//Get data to the main page console
app.get('/', (req, res)=> {
    res.send(projectData);
});
//get data from api
app.get('/api', (req, res)=> {
    res.send(data);
    console.log(data);
});
//post data from api
app.post('/api', (req, res)=> {
    Object.assign(data, req.body);
    res.send(data);
});