'use strict';

const CONFIG = {
    version: '1.0.0.0',
    server: {
        host: 'localhost',
        port: process.env.PORT || 3001,
        domain: 'http://localhost:3001'
    },
    api: {
        url: 'http://localhost:3000'
    },
    secret_key: '11nfvsMof10XnUdQEWuxgAZta22'
};

module.exports = CONFIG;
