const express = require('express');
const Url = require('../models/Url');

const router = express.Router();

// @route  GET /:urlCode,  @desc  Redirect to originalUrl

router.get('/:urlCode',  async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.urlCode });
        if (url) {
            return res.redirect(url.originalUrl)
        } else {
            return res.status(404).json('Url Not Found')
        }
    } catch(err) {
        console.error(err);
        res.status(500).json('Server error')
    }
})

module.exports = router;