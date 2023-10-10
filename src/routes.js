const express = require('express');

const { keywordController, indicatorController } = require('./controllers')

const router = express.Router();

router.get("/keywords", keywordController.get);

router.get("/indicators", indicatorController.get);

module.exports = router