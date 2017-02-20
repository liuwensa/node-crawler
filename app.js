/**
 * Created by liuwensa on 2016/12/20.
 */

'use strict';

require('./global-variable');

const express      = require('express');
const path         = require('path');
const log4js       = require('log4js');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');

const cron   = require('./cron');
const routes = require('./routes/index');

const app = express();

app.use(log4js.connectLogger(logger, config.log));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err    = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error  : err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error  : err
  });
});

app.set('port', process.env.PORT || 30008);

let server = app.listen(app.get('port'), function () {
  logger.info('Express server listening on port ' + server.address().port);
  logger.info('抓取数据启动');
  cron.cronCrawler();
});
