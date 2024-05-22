const express = require('express');

const { keywordController, indicatorController, analysisController, goalController } 
  = require('./controllers')

const router = express.Router();

router.get("/goals", goalController.get);

router.get("/keywords", keywordController.get);

router.get("/indicators", indicatorController.get);

router.post("/analysis", analysisController.analyse);

router.post("/pre-analysis", analysisController.preAnalyse);

module.exports = router