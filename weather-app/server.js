if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const axios = require('axios');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/weather', (req, res) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
    axios({
        url: url,
        responseType: 'json',  
    }).then(data => res.json(data.data))
})

app.listen(PORT, (err) => {
    if (err) console.log(err)
    else console.log(`Server running on port ${PORT}`);
})