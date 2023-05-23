const express = require('express');
const keywordController = require('./controllers/keywordController.js')

const router = express.Router();

router.get("/keywords", keywordController.get);

module.exports = router