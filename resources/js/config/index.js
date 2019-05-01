'use strict';
const CONFIG = require('./env/' + (process.env.NODE_ENV || 'development'));
module.exports = CONFIG;
