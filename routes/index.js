// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/forgot', (req, res) => {
  res.render('forgot');
});
router.get('/index2', (req, res) => {
  res.render('index2');
});

module.exports = router;