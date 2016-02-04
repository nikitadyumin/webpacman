const dict = require('./src/dict');
const store = require('./src/store');
const connection = require('./src/com/connection');
const dispatch = require('./src/com/dispatch');
const config = require('./src/config')();
const protocol = require('./src/com/protocol');
import { merge } from 'ramda';
import { render } from './src/render';

function log(text) {
    console.info(text);
}

function onClick(input, connection) {
    return () => connection.send(input.value);
}

const _store = store({
    players: [],
    map: [],
    self: {}
});

const url = config.debug
    ? 'ws://localhost:8080/websocket'
    : 'ws://fierce-basin-86946.herokuapp.com/websocket';

const _connection = connection(url, {
    onOpen: () => log(dict.MESSAGE.CONNECTED),
    onClose: () => log(dict.MESSAGE.DISCONNECTED)
});
_connection.subscribe(log);

const {players$, self$, map$} = dispatch(_connection);

const model = _store
    .plug(players$, (s, u) => merge(s, {players: u}))
    .plug(self$, (s, u) => merge(s, {self: u}))
    .plug(map$, (s, u) => merge(s, {map: u}))
    .stream();

model.subscribe(log);
model.subscribe(render(document.querySelector('#current')));

Rx.DOM.keydown(
    document.querySelector('body'),
    e => (e.preventDefault(), e.keyCode)
).withLatestFrom(model).subscribe(dispatchKeypress);

function dispatchKeypress([keyCode, model]) {
    const position = {
        x: model.self.x,
        y: model.self.y
    };

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