const express = require('express');

const { keywordController, indicatorController, analysisController } 
  = require('./controllers')

const router = express.Router();

router.get("/keywords", keywordController.get);

router.get("/indicators", indicatorController.get);

router.post("/analysis", analysisController.analyse);

module.exports = router