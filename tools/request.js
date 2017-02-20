/**
 * Created by liuwensa on 2016/12/20.
 */

'use strict';

const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const request = require('request-promise');

module.exports = {
  reqGetByProxy: reqGetByProxy,
  getPageUtf8ByProxy: getPageUtf8ByProxy
};


const reqHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36'
};

/**
 * getPageUtf8ByProxy
 * @param {string} url
 */
function getPageUtf8ByProxy(url) {
  return getToutiaoCookie()
    .then((cookieStr) => {
      return request.get({
          url: url,
          timeout: 60000,
          headers: {
            Cookie: cookieStr,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36'
          },
          gzip: true
        })
        .then(body => {
          const ret = cheerio.load(body, {
            normalizeWhitespace: false,
            xmlMode: false,
            decodeEntities: false
          });
          return ret;
        });
    });
}

/**
 * requestGet
 * @param {string} url
 */
function reqGetByProxy(url) {
  return request.get({
    url: url,
    timeout: 60000,
    headers: reqHeaders,
    json: true
  });
}

/**
 * 获取头条号的cookie
 * @returns {Promise}
 */
function getToutiaoCookie() {
  const j = request.jar();
  const url = 'http://www.toutiao.com/';
  return request({
      headers: reqHeaders,
      url: url,
      jar: j
    })
    .then(body => {
      const cookieString = j.getCookieString(url) || '';
      return cookieString;
    });
}