/**
 * Created by liuwensa on 2016/12/20.
 */

'use strict';

const request = require('../tools/request');

const getPageUtf8ByProxy = request.getPageUtf8ByProxy;
const reqGetByProxy      = request.reqGetByProxy;

module.exports = {
  cronCrawlTouTiaos: cronCrawlTouTiaos,
  reqTtouTiaos     : reqTtouTiaos
};

/**
 * reqTtouTiaos
 * @param {Array} sources
 * @returns {Promise.<TResult>}
 */
function cronCrawlTouTiaos(sources) {
  sources = sources || [];

  if (!sources || !Array.isArray(sources)) {
    return Promise.resolve();
  }

  return Promise.each(sources, (source) => getTtouTiaos(source));
}

/**
 * reqTtouTiaos
 * @param {object} req
 * @param {object} res
 * @returns {Promise.<TResult>}
 */
function reqTtouTiaos(req, res) {
  const authorUrl = req.query.authorUrl;

  if (!authorUrl) {
    return res.json('authorUrl不能为空！');
  }

  logger.info('------------authorUrl----------------------', authorUrl);
  getTtouTiaos(authorUrl)
    .then((results) => {
      // TODO 实现插入数据库或者写入文件逻辑，不同业务不同实现方式。目前我自己是调用自己接口实现写入语句
      return res.json(results);
    });
}

/**
 * getTtouTiaos
 * @param {string} authorUrl
 * @returns {Promise.<TResult>}
 */
function getTtouTiaos(authorUrl) {
  const mediaID = authorUrl
    .replace('http://www.toutiao.com/m', '')
    .replace('/', '');

  const url = `http://www.toutiao.com/pgc/ma/?media_id=${mediaID}&page_type=1&max_behot_time=0&count=10&version=2&platform=pc&as=479BB4B7254C150`;

  const artLists = [];
  
  return reqGetByProxy(url)
    .then((content) => {
      if (content && content.data) {
        logger.info('------------toutiao返回：--------------------', content);
        const lists = content.data;
        return Promise.each(lists, (list) => {
          // TODO 可以筛选哪些是需要的文章
          return getArticleDetail(list.source_url)
          .then((result) => {
            const img = list.image_list.length ? list.image_list[0].url : '';
            
            // TODO 可以实现图片的下载和内容详情中图片下载和替换
            artLists.push({
              title     : list.title,
              img       : img,
              brief     : list.abstract,
              sourceUrl : list.source_url,
              content   : result.content,
              tags      : result.tags,
              author    : result.author,
              origin    : result.origin,
              time      : new Date().Format('yyyy-MM-dd hh:mm:ss'),
              updateTime: new Date().Format('yyyy-MM-dd hh:mm:ss')
            });
             return null;
            })
            .catch((err) => {
              logger.info('------------抓取文章的详情页出错，没抓取到内容----------------------', err);
              return null;
             });
        })
          .then(() => {
            return artLists;
          })
          .catch((err) => {
            logger.info('--------------------------------', err);
            return artLists;
          });
      } else {
        return artLists;
      }
    })
    .catch((err) => {
      logger.info('--------------------------------', err);
      return artLists;
    });
}

/**
 * getArticleDetail
 * @param {string} sourceUrl
 * @returns {Promise.<TResult>}
 */
function getArticleDetail(sourceUrl) {
  return getPageUtf8ByProxy(sourceUrl).then(($) => {
    const content = $('div.article-content');
    content.find('p.footnote').remove();
    content.find('div.mp-vote-box').remove();
    content.find('*:not(*[align="center"]):not(img[style*="margin: auto"])').removeAttr('style');
    content.find('a').removeAttr('href');
    // $('div.article-content > p:has(img)').css('align', 'center');
    const origin = $('div.articleInfo > span.src').text().trim();
    const tags   = [];
    $('ul.label-list > li ').each(function (i, e) {
      tags.push($(e).text().trim());
    });
    return {
      content: content.html(),
      tags   : tags,
      author : origin,
      origin : origin
    };
  });
}
