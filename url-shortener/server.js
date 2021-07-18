const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/urls', { useNewUrlParser: true, useUnifiedTopology: true})

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index', {shortUrls: shortUrls})
})

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ original: req.body.origUrl });
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (!shortUrl) return res.status(404)
    shortUrl.clicks ++
    shortUrl.save()
    res.redirect(shortUrl.original)
})

app.listen(PORT, (err) => {
    if (err) console.log(err)
    else console.log(`Server running on port ${PORT}`);
})