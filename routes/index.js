/**
 * Created by liuwensa on 2016/12/20.
 */

'use strict';

const express = require('express');

const toutiaoCtrl = require('../controllers/toutiao');
const zhihuCtrl = require('../controllers/zhihu');
const hbmeinvCtrl = require('../controllers/hbmeinv');
const laifudaoCtrl = require('../controllers/laifudao');

const router = express.Router();

router.get('/', function (req, res) {
  return res.json();
});

// 今日头条
router.get('/toutiao/news', toutiaoCtrl.reqTtouTiaos);
router.get('/toutiao/news/:id', toutiaoCtrl.touTiaoNewsDetail);

  // 知乎日报
router.get('/zhihu/news', zhihuCtrl.zhihuNews);
router.get('/zhihu/news/:id', zhihuCtrl.zhihuNewsDetail);

// 花瓣美女
router.get('/hbmeinv', hbmeinvCtrl.hbmeinvContent)

// 来福岛笑话
router.get('/laifudao/joke/pic', laifudaoCtrl.laifudaoJokePic);
router.get('/laifudao/joke', laifudaoCtrl.laifudaoJoke);

module.exports = router;
