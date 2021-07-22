const express = require('express');
const validUrl = require('valid-url');
const shortId = require('shortid');
const Url = require('../models/Url');

const router = express.Router();
const baseUrl = "http://localhost:5000";

// @route  POST /api/url/shorten, @desc  Create short URL

router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    if (!validUrl.isUri(baseUrl)) {
        return res.status(400).json('Invalid base url');
    }
    const urlCode = shortId.generate();
    if (validUrl.isUri(originalUrl)) {
        try {
            let url = await Url.findOne({ originalUrl: originalUrl })
            if (url) {
                res.status(200).json(url)
            } else {
                const shortUrl = baseUrl + '/' + urlCode
                url = new Url({
                    originalUrl,
                    shortUrl,
                    urlCode, 
                    date: new Date()
                })
                await url.save();
                res.json(url);
            }
        } catch(err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(400).json('Invalid original url');
    }
})

module.exports = router;