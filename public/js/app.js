const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const address = document.querySelector('#location');
const temperature = document.querySelector('#temperature');
const weatherDesc = document.querySelector('#weather-desc');
const weatherIcon = document.querySelector('#weather-icon');
const timestamp = document.querySelector('#timestamp');
const errorMsg = document.querySelector('#error');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    fetch('/weather?city=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMsg.textContent = "Error, por favor introduce una dirección válida!";
            }
            else {
                errorMsg.textContent = "";
                errorMsg.style.margin = "0";
                address.textContent = data.location.name + ", " + data.location.country;
                temperature.textContent  = "Temperatura: " + data.current.temperature;
                weatherDesc.textContent = data.current.weather_descriptions[0];
                weatherIcon.src = data.current.weather_icons[0];
                timestamp.textContent = data.location.localtime;
            }
        });
    });
});