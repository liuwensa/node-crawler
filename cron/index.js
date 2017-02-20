/**
 * Created by admin on 2016/7/8.
 */

'use strict';

const schedule = require('node-schedule');

const crawler = require('../controllers/crawlerToutiao');


const rule = new schedule.RecurrenceRule();
rule.hour = [11, 17, 22];
rule.minute = 30;

/**
 * cronCrawler
 */
function cronCrawler() {
  schedule.scheduleJob(rule, function () {
    logger.info('头条抓取开始');
    return crawler.cronCrawlTouTiaos()
      .then(() => {
        logger.info('头条抓取结束！');
      })
      .catch((err) => {
        logger.error('头条抓取出错：', err);
      })
  });
}

exports.cronCrawler = cronCrawler;