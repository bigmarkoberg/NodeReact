var fs = require('fs');
var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();//{
     //uploadDir: process.env.TEMP_UPLOAD_DIR 
//});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

var router = express.Router();

router.get('/', function (req, res, next) {
    console.log('Received /');
    res.status(200).end('0');
});

app.use('/', router);
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var server = http.createServer(app);
var port = process.env.LOCAL_PORT || '80';

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    console.log('onError in server...');

    if (error.syscall !== 'listen') {
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error('Requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('Already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    console.log('onListening in server...');
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Server bind: ' + bind.toString());
}