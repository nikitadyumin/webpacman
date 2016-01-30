const dict = require('./src/dict');
const game = require('./src/game');
const store = require('./src/store');
const connection = require('./src/com/connection');
const dispatch = require('./src/com/dispatch');
const config = require('./src/config')();
const protocol = require('./src/com/protocol');

function log(text) {
    console.info(text);
}

function onClick(input, connection) {
    return () => connection.send(input.value);
}
const _store = store({
    players: [],
    selfId: null
});

_store.stream().subscribe(log);

const _game = game(document.getElementById('game'));
const url = config.debug
    ? 'ws://localhost:8080/websocket'
    : 'ws://fierce-basin-86946.herokuapp.com/websocket';

const _dispatcher = dispatch(_game, {
    onUnknown: (msg) => log(dict.MESSAGE.INCOMING + msg)
});

const _connection = connection(url, {
    onOpen: () => log(dict.MESSAGE.CONNECTED),
    onMessage: _dispatcher.dispatch,
    onClose: () => log(dict.MESSAGE.DISCONNECTED)
});

document.querySelector('body')
    .addEventListener('keydown', function (e) {
        const position = _dispatcher.getPosition();
        switch (e.keyCode) {
            case 37:
                position.x -= 1;
                break;
            case 38:
                position.y -= 1;
                break;
            case 39:
                position.x += 1;
                break;
            case 40:
                position.y += 1;
                break;
            default:
                console.info(e.keyCode);
                break;
        }
        _connection.send(protocol.getPositionUpdateMessage(position));
    });

document.getElementById('send')
    .addEventListener('click', onClick(document.getElementById('msg'), _connection));