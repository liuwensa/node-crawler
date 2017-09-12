/**
 * Created by liuwensa on 2017/9/12.
 */

'use strict';

const request = require('../tools/request');

const getPageUtf8ByProxy = request.getPageUtf8ByProxy;
const reqGetByProxy      = request.reqGetByProxy;

const laifudaoUrl = 'http://api.laifudao.com';

module.exports = {
  laifudaoJokePic,
  laifudaoJoke
};

/**
 * 笑话图片
 * @param {string} authorUrl
 * @returns {Promise.<TResult>}
 */
async function laifudaoJokePic(req, res, next) {
  const url = `${laifudaoUrl}/open/tupian.json`;
 
  const results = await reqGetByProxy(url);
  return res.send({
    code: 1,
    data: results
  });
}

/**
 * 笑话
 * @param {string} authorUrl
 * @returns {Promise.<TResult>}
 */
async function laifudaoJoke(req, res, next) {
  const url = `${laifudaoUrl}/open/xiaohua.json`;
 
  const results = await reqGetByProxy(url);
  return res.send({
    code: 1,
    data: results
  });
}
