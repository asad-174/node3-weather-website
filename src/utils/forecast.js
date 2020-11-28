const request = require('postman-request');

const forecast = (latitude, langitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4c91501d0c0d8eb21d1b57d79db5c62e&query=${latitude,langitude}`;

    request({url , json : true}, (error , { body } = {}) => {
        if (error) {
          callback('Unable to connect to the weather service.', undefined);
        }
        else if (body.error) {
          callback('Unable to find weather location', undefined);
        }
        else {
            //callback(undefined , `${responce.body.current.weather_descriptions[0]}. It is currently ${responce.body.current.temperature} degree out. It feels like ${responce.body.current.feelslike} degree out.`);
           callback(undefined , {
               weather_des: body.current.weather_descriptions[0],
               temperature: body.current.temperature,
               feels_like: body.current.feelslike,
               body : `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degree out. It feels like ${body.current.feelslike} degree out.
               Humidity is ${body.current.humidity}. Visibility is ${body.current.visibility}`
           });
        }

    });
}

module.exports = forecast;