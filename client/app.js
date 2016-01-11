const dict = require('./src/dict');

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

(function () {
    const ws = new WebSocket('ws://localhost:8080/websocket');

    ws.onopen = function () {
        addStatus(dict.MESSAGE.CONNECTED);
    };
    ws.onmessage = function (e) {
        addStatus(dict.MESSAGE.INCOMING + e.data);
    };
    ws.onclose = function () {
        addStatus(dict.MESSAGE.DISCONNECTED);
    };

    document.getElementById('send').addEventListener('click', onClick(ws));
}());