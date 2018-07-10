"use strict";

const config = require('./config.json')

const env = process.env.NODE_ENV || 'development';
console.log('env', env);

if ('development' === env || 'production' === env || 'test' === env) {
    process.env = {
        ...process.env,
        ...config[env]
    }
}