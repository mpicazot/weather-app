const path = require('path');
const express = require('express');
const hbs = require('hbs');
var request = require('request');
//const { send } = require('process');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const weatherAPIURL = 'http://api.weatherstack.com/current?access_key=b51103c20e676c03a257803642c834a8&query=';

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    console.log(viewsPath);
    res.render('index', {
        title: 'Aplicación del Clima',
        name: 'Manuel Picazo'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.city) return res.send({
        error: 'You must provide a city'
    });
    let url = weatherAPIURL + req.query.city;
    request({url, json:true}, function(error, response, body) {
        if(error) send({ error });
        if(response.statusCode === 200) {
            console.log(body);
            res.send(body);
        }
    });
});

app.listen(3000, () => console.log('Server started on port 3000'));