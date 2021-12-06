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
    const name = client.handshake.auth.token;
    // console.log(client.handshake.auth.token);
    client.broadcast.emit('server-connectedID', name);

    client.on('client-msg', data => {
        // console.log(data);
        const payload = {
            // message: data.message.split('').reverse().join(''),
            message: data.message,
            id: name,
        };
        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });
    client.on('disconnect', () => {
        const disconnectedID = {
            id: name,
        }
        client.broadcast.emit('server-disconnectedID', disconnectedID);
        client.emit('server-disconnectedID', disconnectedID);
    });
    client.on('reconnect', () => {
        const reconnectedID = {
            id: name,
        }
        console.log('reconnected')
        client.broadcast.emit('server-reconnectedID', reconnectedID);
        client.emit('server-reconnectedID', reconnectedID);
    });
    // client.on('user-reconnected', username => {
    //     console.log(username + ' just reconnected');
    // });
});

io.on('reconnect', client => {
    console.log(client.id, 'reconnected');
});
// connected, data, client, disconnect, reconnect, sids


server.listen(5555);