const express = require('express');

const { keywordController, indicatorController, goalController } 
  = require('./controllers')

const router = express.Router();

router.get("/keywords", keywordController.get);

router.get("/indicators", indicatorController.get);

router.post("/goals", goalController.get);

module.exports = router