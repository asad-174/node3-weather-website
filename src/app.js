const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public' );
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        wheather_description : 'Visit our site for weather info',
        name : 'Asad Mehboob'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Asad Mehboob'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
       helpText : 'We are here to Help You',
       title: 'Help',
       name : 'Asad Mehboob'
   });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'You must need to provide address'
        });
    }
    weatherInfo(req.query.address, (error, response) => {
       if (error) {
        return res.send({
            error : error
        })
       }

       res.send({
        location : response.location,
        body : response.body,
       }) 
    })
    
});

app.get('/weather-example', (req, res) => {
    if(!req.query.address) {
      return res.send({
          error : 'You must need to provide address'
      });
    }
    res.send({
        forecast : 'Rain',
        location : 'Lahore',
        address : req.query.address
    });
 });

// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req, res) => {
   res.render('404', {
       title : '404',
       name : 'Asad Mehboob',
       errorMessage : 'Help article not found.'
   });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({
           error : 'You must provide a search term'
       });
    }

    console.log(req.query);
    res.send({
    products: [req.query]  
    });
});

const weatherInfo = (address, callback) => {
    geocode(address , (error , {latitude, langitude, location} = {}) => {
        if(error) {
            return callback(error, undefined);
        }
    
        forecast(latitude, langitude, (error, data) => {
            if(error) {
                return callback(error ,undefined);
            }

            callback(undefined , {
                location : location,
                body : data.body
            });
    
          });
    });
}


app.get('*', (req, res) => {
   res.render('404', {
       title : '404',
       name : 'Asad Mehboob',
       errorMessage : 'Page not found.'
   })
});

app.listen(port, () => {
    console.log('Server is up on port 3000');
});


// app.get('/weather', (req, res) => {
//     res.send({
//         forecast : 'Rain',
//         location : 'Lahore'
//     });
//  });