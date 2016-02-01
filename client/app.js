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
    onClose: () => log(dict.MESSAGE.DISCONNECTED)
});

_connection.subscribe(_dispatcher.dispatch);

Rx.DOM.keydown(
    document.querySelector('body'),
    e => (e.preventDefault(), e.keyCode)
).subscribe(dispatchKeypress);

function dispatchKeypress(keyCode) {
    const position = _dispatcher.getPosition();
    const ARROWS = {
        LEFT: 37,
        TOP: 38,
        RIGHT: 39,
        BOTTOM: 40
    };

    switch (keyCode) {
        case ARROWS.LEFT:
            position.x -= 1;
            break;
        case ARROWS.TOP:
            position.y -= 1;
            break;
        case ARROWS.RIGHT:
            position.x += 1;
            break;
        case ARROWS.BOTTOM:
            position.y += 1;
            break;
        default:
            console.info(keyCode);
            break;
    }

    _connection.onNext(protocol.getPositionUpdateMessage(position));
}

document.getElementById('send')
    .addEventListener('click', onClick(document.getElementById('msg'), _connection));