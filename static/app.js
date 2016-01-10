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
        addStatus('connected!');
    };
    ws.onmessage = function (e) {
        addStatus('server: ' + e.data);
    };
    ws.onclose = function () {
        addStatus('closed');
    };

    document.getElementById('send').addEventListener('click', onClick(ws));
}());