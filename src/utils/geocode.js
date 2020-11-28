const request = require('postman-request');

const geocode = (address , callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXNhZG1laGJvb2IiLCJhIjoiY2tobDBvaXQ4MGFsYzM1bzlzZXY0a2F1dCJ9.dtfX2X3hQ6AlL4VlB8ulsw&limit=1`;
    
    request({url , json : true}, (error , { body } = {}) => {
      if (error) {
         callback('Unable to connect to location services!', undefined);
       }
       else if(body.message || body.features.length == 0){
         callback('Unable to find location', undefined);
       }
       else{
         callback(undefined, {
             latitude: body.features[0].center[0],
             langitude: body.features[0].center[1],
             location : body.features[0].place_name
         });
       }
    });
 }

 module.exports = geocode;




 //const url = 'http://api.weatherstack.com/current?access_key=4c91501d0c0d8eb21d1b57d79db5c62e&query=Lahore&units=f';


 // request({url :url , json : true}, (error , responce) => {
//     if (error) {
//       console.log('Unable to connect to the weather service.');
//     }
//     else if (responce.body.error){
//         console.log('Unable to find location');
//     }
//     else {
//       console.log(`${responce.body.current.weather_descriptions[0]}. It is currently ${responce.body.current.temperature} degree out. It feels like ${responce.body.current.feelslike} degree out.`);
//     }
// })

//https://weatherstack.com/documentation
//mapbox.com
//Geocoding
// Address -> Lat/Lang -> Weather


//const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Lahore.json?access_token=pk.eyJ1IjoiYXNhZG1laGJvb2IiLCJhIjoiY2tobDBvaXQ4MGFsYzM1bzlzZXY0a2F1dCJ9.dtfX2X3hQ6AlL4VlB8ulsw&limit=1';

// request({url : mapBoxUrl , json : true}, (error , responce) =>{
//     debugger
//     if(error) {
//         console.log('Unable to connect to the weather service.');
//     }
//     else if (responce.body.message || responce.body.featulength == 0) {
//         console.log('Unable to find location');
//     }
//     else {
//        const latitude = responce.body.features[0].center[0];
//        const langitude = responce.body.features[0].center[1];
//        console.log(latitude , langitude);
//     }
// });