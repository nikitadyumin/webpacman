import dict from './src/dict';
import store from './src/store';
import connection from './src/com/connection';
import dispatch from './src/com/dispatch';
import config from './src/config';
import protocol from './src/com/protocol';
import { merge } from 'ramda';
import { render } from './src/render';
import inputDispatcher from './src/input';

function log(text) {
    console.info(text);
}

function context(element) {
    const blockSize = element.offsetWidth / 19,
        canvas = document.createElement('canvas');

    canvas.setAttribute('width', (blockSize * 19) + 'px');
    canvas.setAttribute('height', (blockSize * 22) + 65 + 'px');
    element.appendChild(canvas);
    return canvas.getContext('2d');
}

function onClick(input, connection) {
    return () => connection.send(input.value);
}

const _store = store({
    players: [],
    map: [],
    self: {}
});

const _config = config();
const url = _config.debug
    ? 'ws://localhost:8080/websocket'
    : 'ws://fierce-basin-86946.herokuapp.com/websocket';

const _connection = connection(url, {
    onOpen: () => log(dict.MESSAGE.CONNECTED),
    onClose: () => log(dict.MESSAGE.DISCONNECTED)
});

const {players$, self$, map$} = dispatch(_connection);

const model = _store
    .plug(players$, (s, u) => merge(s, {players: u}))
    .plug(self$, (s, u) => merge(s, {self: u}))
    .plug(map$, (s, u) => merge(s, {map: u}))
    .stream();

model.subscribe(render(
    context(document.querySelector('#game')),
    document.querySelector('#current'))
);

const {positionUpdate$, tabPressed$} = inputDispatcher(document.querySelector('body'))(model);

positionUpdate$.map(position => protocol.getPositionUpdateMessage(position))
    .distinctUntilChanged()
    .subscribe(update => _connection.send(update));

tabPressed$.subscribe(log);

document.getElementById('send')
    .addEventListener('click', onClick(document.getElementById('msg'), _connection));