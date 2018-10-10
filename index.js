require('dotenv').config();

const http = require('http');

function handleRequest({ url = '', headers }, res) {
    const { query } = headers;

    res.end(JSON.stringify({
        url,
        query,
        headers,
    }, null, 2));
}

const ports = process.env.NODE_PORT.split(',');
ports.forEach(port => {
    const server = http.createServer(handleRequest);

    server.listen(port, err => {

        if (err) {
            console.error(err);
            return;
        }

        console.log(`listening on ${port}`);
    });
});
