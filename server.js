const express = require('express');
const http = require('http');
const path = require('path');
const Request = require('request');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3001;

//init body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//set static folder
app.use(express.static(__dirname + '/dist/testApp'));

app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname));
});

//set access control
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//get all image details
app.post('/getAllDetails',(req,res)=> {
Request.get("https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1", (error, response, body) => {
    if(error) {
        console.log(error);
        res.status(500).end();
    }
    res.end(body);
});
});

//get details by tag name
app.post('/getDetailsByTag',(req,res)=> {
    Request.get("https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags="+req.body.tag, (error, response, body) => {
        if(error) {
            console.log(error);
            res.status(500).end();
        }
        res.end(body);
    });
    });


//create http server
const server = http.createServer(app);

server.listen(port, () => {
    console.log('Running : 3001');
});