/**
 * Created by liuwensa on 2014/11/1.
 */

'use strict';

const log4js = require('log4js');

const log4jsConfig = require('./log4jsConfig');

log4js.configure(log4jsConfig);

module.exports = log4js;