/**
 * Created by liuwensa on 2016/12/20.
 */

'use strict';

const express = require('express');

const crawler = require('../controllers/crawlerToutiao');

const router = express.Router();

router.get('/', function (req, res) {
  return res.json();
});

router.route('/articles')
  .get(crawler.reqTtouTiaos);

module.exports = router;
