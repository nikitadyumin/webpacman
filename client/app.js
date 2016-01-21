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

(function () {
    const current = document.getElementById('current');
    const ws = new WebSocket('ws://fierce-basin-86946/websocket'),
        game = gameStarter(document.getElementById('game'));

    ws.onopen = function () {
        addStatus(dict.MESSAGE.CONNECTED);
    };
    ws.onmessage = function (e) {
        const data = JSON.parse(e.data);
        if (data.map) {
            current.innerHTML = data.map.map(line =>
                '<div>' + line.map(cell =>
                    `<span class="c${cell}">${cell}</span>`
                ).join('')+ '</div>'
            ).join('');
            game.map(data.map);
        } else {
            addStatus(dict.MESSAGE.INCOMING + e.data);
        }
    };
    ws.onclose = function () {
        addStatus(dict.MESSAGE.DISCONNECTED);
    };

    document.getElementById('send').addEventListener('click', onClick(ws));
}());