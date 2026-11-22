const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    res.end('<h1>Welcome to Node.js!</h1><p>Running inside Docker!</p>');
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});