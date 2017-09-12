/**
 * Created by liuwensa on 2017/9/12.
 */

'use strict';

const request = require('../tools/request');

const getPageUtf8ByProxy = request.getPageUtf8ByProxy;
const reqGetByProxy      = request.reqGetByProxy;

const hbmeinvUrl = 'http://www.hbmeinv.com';

module.exports = {
  hbmeinvContent
};

/**
 * 花瓣美女列表
 * @param {string} authorUrl
 * @returns {Promise.<TResult>}
 */
async function hbmeinvContent(req, res, next) {
  const catid = +req.query.catid;
  const page = +req.query.page || 1;

  let catstr = '';
  if (catid) {
    catstr = `&catid=${catid}`;
  }
  const url = `${hbmeinvUrl}/index.php?m=Content&c=Index&a=gengduo&p=${page}${catstr}`;
 
  const results = await reqGetByProxy(url);
  return res.send({
    msg: "success",
    code: 1,
    data: results
  });
}