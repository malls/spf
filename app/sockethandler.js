var app = require('http').createServer();
var io = require('socket.io')(app);

module.exports = (function () {

    io.on('connection', function(socket) {
        socket.emit('console', {message: 'hi there'});
    });

})();