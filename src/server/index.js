var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
var bodyParser = require('body-parser');
var cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

let projectData = {};

const app = express()
app.use(cors())

// to use json
app.use(bodyParser.json())

// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

app.listen(4000, function () {
    console.log(`App is running on port ${4000}!`)
})

app.get('/generateformdata', function (req, res) {
    let formdata = {
        key: process.env.API_LICENSE_KEY
    };
    res.json(formdata);
})

app.get('/getServerResponse', function (req, res) {
    res.json(projectData);
});

app.post('/syncAllDataWithServer', (req, res) => {
    for (let key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            projectData[key] = req.body[key];
        }
    }
    res.json(projectData);
});

app.get('/receiveGeoUserNameKey', (req, res) => {
    res.send({
        username: process.env.GEONAMES_USERNAME,
    });
})

app.get('/receiveWeatherBitApiKey', (req, res) => {
    res.send({
        key: process.env.WEATHERBIT_KEY
    });
})

app.get('/receivePixaBayKey', (req, res) => {
    res.send({
        key: process.env.PIXABAY_KEY
    });
})

app.post('/fetchCountryCode', (req, res) => {
    const obj = {
        country: mockAPIResponse[req.body.code]
    }
    res.json(obj);
});