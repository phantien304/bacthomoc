'use strict';

const CONFIG = {
    version: '1.0.0.0',
    server: {
        host: 'localhost',
        port: process.env.PORT || 8000,
        domain: 'http://127.0.0.1:8000'
    },
    api: {
        url: 'http://192.168.0.109:3000'
    },
    secret_key: '11nfvsMof10XnUdQEWuxgAZta22'
};

module.exports = CONFIG;
