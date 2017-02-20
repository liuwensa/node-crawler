/**
 * 默认配置文件
 */

'use strict';

module.exports = {
  log : {
    logFileDir: '/raid/logs/node-crawler/',
    nolog : /\.(js|css|png|jpeg|ico|gif|svg)$/,
    level : 'AUTO',
    format: ':remote-addr :method :url :status :response-time ms :user-agent :content-length',
    needConsole: true,
    replaceConsole: true
  },
  timeout          : 1000 * 60,
  maxCookieAge     : 1000 * 60 * 60 * 24,
  maxStaitcFileAge : 1000 * 60 * 60
};
