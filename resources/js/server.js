var express = require('express'),
    http = require('http'),
    https = require('https'),
    path = require('path'),
    app = express(),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    hbs = require('express-hbs'),
    config = require('./config'),
    port = config.server.port,
    env = process.env.NODE_ENV || 'development',
    webpackConfig = require('./webpack.config');
var helpers = require('handlebars-helpers')(hbs);

app.set('port', config.server.port);
app.set('etag', false);
app.enable('trust proxy');
app.disable('x-powered-by', false);
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(compression());

app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/src/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/src/views');
app.use(express.static(__dirname + '/wwwroot'));


app.get('/robots.txt', function(req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

app.use(function(req, res, next) {
    if (req.url == '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
    } else {
        //req.io = io;
        next();
    }
});

if (env == 'development') {
    var webpack = require('webpack'),
        wpConfig = require('./webpack.config.js'),
        compiler = webpack(wpConfig(env));

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: '/dist/js/'
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));
}


app.get('*', [], function(req, res) {
    res.render('index', {
        apiUrl: config.api.url,
        version: config.version,
        mode: process.env.NODE_ENV || 'development'
    });
});

var server = http.createServer(app);
// var io = require('socket.io');
// io = io(server);




server.listen(app.get('port'), function() {
    console.log('Amela CMS started! port: ' + app.get('port') + ", mode: " + env);
});
