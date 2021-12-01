const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);

io.on('connection', client => { //connect, disconnect, reconnect
    console.log(`client ${ client.id } connected`);

    client.broadcast.emit('server-connectedID', client.id);

    client.on('client-msg', data => {
        // console.log(data);
        const payload = {
            // message: data.message.split('').reverse().join(''),
            message: data.message,
            id: client.id,
        };
        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });
    client.on('disconnect', data => {
        const disconnectedID = {
            id: client.id,
        }
        client.broadcast.emit('server-disconnectedID', disconnectedID);
        client.emit('server-disconnectedID', disconnectedID);
    });
    client.on('reconnect', data => {
        const reconnectedID = {
            id: client.id,
        }
        console.log('reconnected')
        client.broadcast.emit('server-reconnectedID', reconnectedID);
        client.emit('server-reconnectedID', reconnectedID);
    });
});
// connected, data, client, disconnect, reconnect, sids


server.listen(5555);