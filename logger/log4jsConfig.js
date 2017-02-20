/**
 * Created by liuwensa on 2014/11/1.
 */

'use strict';

const path = require('path');
const fs   = require('fs-extra');

fs.mkdirsSync(path.join(config.log.logFileDir, 'crawl'));

const appenders = [
  {
    category            : 'crawl',
    type                : 'dateFile',
    filename            : config.log.logFileDir + 'crawl/log-',
    pattern             : 'yyyyMMdd',
    alwaysIncludePattern: true,
    maxLogSize          : 1024 * 1024 * 30
  },
  {
    category: 'crawl',
    type    : 'logLevelFilter',
    level   : 'WARN',
    appender: {
      type      : 'file',
      filename  : config.log.logFileDir + 'crawl.WARN',
      maxLogSize: 1024 * 1024 * 30
    }
  },
  {
    category: 'crawl',
    type    : 'logLevelFilter',
    level   : 'ERROR',
    appender: {
      type      : 'file',
      filename  : config.log.logFileDir + 'crawl.ERROR',
      maxLogSize: 1024 * 1024 * 30
    }
  }
];

if (config.log.needConsole) {
  appenders.push({
    type: 'console'
  });
}

module.exports = {
  appenders     : appenders,
  replaceConsole: config.log.replaceConsole
};
