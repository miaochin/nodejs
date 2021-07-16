const searchLocation = document.getElementById('search-location');
const searchBox = new google.maps.places.SearchBox(searchLocation);

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place.length == 0) return
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    fetch('/weather', {
        method:'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json())
        .then(data => {
            setWeatherData(data, place.formatted_address)
            searchLocation.value = null
        })
})

const locationElement = document.getElementById('location')
const temp = document.getElementById('temp');
const mainCondition = document.getElementById('main-condition');
const tempMinMax = document.getElementById('temp-min-max');
const wind = document.getElementById('wind');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');

const setWeatherData = (data, place) => {
    locationElement.innerText = place;
    temp.innerText = data.main.temp;
    mainCondition.innerText = data.weather[0].main;
    tempMinMax.innerText = `${data.main.temp_min}/${data.main.temp_max}`;
    wind.innerText = data.wind.speed
    pressure.innerText = data.main.pressure;
    humidity.innerText = `${data.main.humidity}%`;  
}