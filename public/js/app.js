fetch('http://puzzle.mead.io/puzzle').then((response) => {
    //console.log(response);
    response.json().then((data) => {
       console.log(data.puzzle);
    })
});

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             return console.log(data.error);
//         }
        
//         console.log(data.body);
//         console.log(data.location);
        
//     })
// });

var span = document.querySelector('.weather-report');
var spanError = document.querySelector('.weather-report-error');

span.style.display = 'none';
spanError.style.display = 'none';

getWeatherInfo = () => {
  var city = document.querySelector("#location");
  if(city){ 
  fetch(`http://localhost:3000/weather?address=${city.value}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            spanError.style.display = 'block';
            span.style.display = 'none';
            return spanError.textContent = data.error;
        }
        span.style.display = 'block';
        spanError.style.display = 'none';
        
        span.innerHTML = `Forecast : ${data.body} \n Location : ${data.location}`;
      })
    });
  }
}