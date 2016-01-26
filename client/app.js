const dict = require('./src/dict');
const map = require('./src/Map');
function createLine(text) {
    const el = document.createElement('div');
    el.textContent = text;
    return el;
}

function addStatus(text) {
    const line = createLine(Date() + ': ' + text);
    document.getElementById('status').appendChild(line);
}

function onClick(ws) {
    return function () {
        ws.send(document.getElementById('msg').value);
    }
}
function gameStarter(element) {
    const blockSize = element.offsetWidth / 19,
        canvas = document.createElement('canvas');

    canvas.setAttribute('width', (blockSize * 19) + 'px');
    canvas.setAttribute('height', (blockSize * 22) + 65 + 'px');
    element.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const mapRender = map.render(ctx);
    return {map: mapRender};
}

const parseQuery = R.pipe(
    R.replace('?', ''), R.split('&'), R.reject(R.equals('')),
    R.map(R.pipe(decodeURIComponent, R.invoker(1, 'split')('='))),
    R.fromPairs
);


(function () {
    const current = document.getElementById('current');
    const debug = parseQuery(window.location.search)['debug'];
    const ws = new WebSocket(debug ? 'ws://localhost:8080/websocket' : 'ws://fierce-basin-86946.herokuapp.com/websocket'),
        game = gameStarter(document.getElementById('game'));

    ws.onopen = function () {
        addStatus(dict.MESSAGE.CONNECTED);
    };
    ws.onmessage = function (e) {
        const message = JSON.parse(e.data);
        switch(message.type) {
            case 'map':
                current.innerHTML = message.data.map(line =>
                    '<div>' + line.map(cell =>
                        `<span class="c${cell}">${cell}</span>`
                    ).join('') + '</div>'
                ).join('');
                game.map(message.data);
            break;
            default:
            addStatus(dict.MESSAGE.INCOMING + e.data);
            break;
        }
    };
    ws.onclose = function () {
        addStatus(dict.MESSAGE.DISCONNECTED);
    };

    document.getElementById('send').addEventListener('click', onClick(ws));
}());