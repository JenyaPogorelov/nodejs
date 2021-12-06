const socket = require('socket.io');
const fs = require('fs');
const path = require('path');
const http = require('http');

(async () => {
    let executionDir = process.cwd();
    const isFile = (filename) => fs.lstatSync(filename).isFile();

    const server = http.createServer((request, response) => {
        const fullPath = decodeURI(path.join(executionDir, request.url));

        fs.stat(fullPath, function (err, stats) {
            if (err) {
                return response.end('Directory or file not found');
            } else {
                if (isFile(fullPath)) {
                    return fs.createReadStream(fullPath, 'utf-8').pipe(response);
                }

                let linksList = '';
                const urlParams = request.url.match(/[\d\w\.]+/gi);

                if (urlParams) {
                    urlParams.pop();
                    const prevUrl = urlParams.join('/');
                    linksList = urlParams.length ? `<li> <a href="/${prevUrl}">..</a></li>` : `<li><a href="/">..</a></li>`;
                }

                fs.readdirSync(fullPath)
                    .forEach(fileName => {
                        const filePath = path.join(request.url, fileName);
                        linksList += `<li><a href="${filePath}">${fileName}</a></li>`
                    });
                const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('##links', linksList);
                response.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8',
                })
                return response.end(HTML, 'utf-8');
            }
        });
    });

    const io = socket(server);

    io.on('connection', client => { //connect, disconnect, reconnect
        // console.log(`client ${ client.id } connected`);
        let users = client.server.engine.clientsCount;
        client.broadcast.emit('server-connected', users);
        client.emit('server-connected', users);

        client.on('disconnect', () => {
            users = client.server.engine.clientsCount;
            client.broadcast.emit('server-disconnected', users);
            client.emit('server-disconnected', users);
        });

    });

    server.listen(5555);
})();