const express = require('express');

const keywordController = require('./controllers/keywordController.js')
const indicatorController = require('./controllers/indicatorController.js')

const router = express.Router();

router.get("/keywords", keywordController.get);

router.get("/indicators", indicatorController.get);

module.exports = router