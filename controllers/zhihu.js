/**
 * Created by liuwensa on 2016/12/20.
 */

'use strict';

const request = require('../tools/request');

const getPageUtf8ByProxy = request.getPageUtf8ByProxy;
const reqGetByProxy      = request.reqGetByProxy;

const zhihuNewsUrl = 'http://news-at.zhihu.com';

module.exports = {
  zhihuNews,
  zhihuNewsDetail
};

/**
 * 获取知乎日报最新列表
 * @param {string} authorUrl
 * @returns {Promise.<TResult>}
 */
async function zhihuNews(req, res, next) {
  const url = `${zhihuNewsUrl}/api/3/news/latest`;
 
  const results = await reqGetByProxy(url);
  return res.send({
    msg: "success",
    code: 1,
    data: results
  })
}

/**
 * 获取知乎日报最新列表
 * @param {string} authorUrl
 * @returns {Promise.<TResult>}
 */
async function zhihuNewsDetail(req, res, next) {
  const id = req.params.id;

  if (!id) {
    res.send({ msg: '参数错误：id', code: 0});
  }

  const url = `${zhihuNewsUrl}/api/3/news/${id}`;
  
  const results = await reqGetByProxy(url);
  return res.send({
    msg: "success",
    code: 1,
    data: results
  })
}
