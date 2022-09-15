// to run the server => "$ nodemon server"

// import http package from NodeJs
const http = require('http');

//  to import app.js in the same folder
const app = require('./app')

// todo: dotenv to comment
const dotenv = require('dotenv')

// todo: dotenv config method to comment
dotenv.config();

const normalizePort = val => {
    // cast val as a number, on a decimal base
    const port = parseInt(val, 10)

    // if port returns is NaN, it will return 'val'
    if (isNaN(port)) {
        return val;
    }
    // if port is a number >= 0, it will return port
    if (port >= 0) {
        return port;
    }
    //else it returns false
    return false;
};

// normalize the type of port value
// the server will be listening on .env.PORT or port 3000
const port = normalizePort((process.env.PORT || 3000));

// set to express app which port to listen
app.set('port', port)

const errorHandler = error => {

    // The error.syscall property is a string describing the syscall that fail
    // if the reason is different from 'listen', throws error
    if (error.syscall !== 'listen') {
        throw error;
    }

    // calls the node's native function address
    // that returns the bound address containing the family name, and port of the server.
    const address = server.address();

    // if address is a string returns 'pipe + address' else returns 'port + address'
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {

        // if the system call was passed a path that was inaccessible by the current user
        case 'EACCES':
            // terminate the process forcefully with code 1 on case error.code === 'EACCES'
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;

        // if multiple instances of the server are running or multiple node
        case 'EADDRINUSE':
            // terminate the process forcefully with code 1 on case error.code === 'EADDRINUSE'
            console.error(bind + ' is already in use')
            process.exit(1);
            break;

        // else throw error
        default:
            throw error;
    }
};


// The express app, passed as an argument, will listen and respond to http requests
const server = http.createServer(app);

// on error, call the errorHandler function
server.on('error', errorHandler);

// todo: on listening comment
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address == 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind)
})

// the server will be listening on const port
server.listen(port);