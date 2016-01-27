const dict = require('./src/dict');
const game = require('./src/game');
const connection = require('./src/com/connection');
const dispatch = require('./src/com/dispatch');
const config = require('./src/config')();

function log(text) {
    console.info(text);
}

function onClick(input, connection) {
    return () => connection.send(input.value);
}

const _game = game(document.getElementById('game'));
const url = config.debug
    ? 'ws://localhost:8080/websocket'
    : 'ws://fierce-basin-86946.herokuapp.com/websocket';

const _connection = connection(url, {
    onOpen: () => log(dict.MESSAGE.CONNECTED),
    onMessage: dispatch(_game, {
        onUnknown: (msg) => log(dict.MESSAGE.INCOMING + msg)
    }),
    onClose: () => log(dict.MESSAGE.DISCONNECTED)
});

document.getElementById('send')
    .addEventListener('click', onClick(document.getElementById('msg'), _connection));