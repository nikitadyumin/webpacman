function connection(url, {onOpen, onMessage, onError, onClose}) {
    const ws = new WebSocket(url);
    ws.onopen = onOpen;
    ws.onmessage = onMessage;
    ws.onclose = onClose;
    return ws;
}

module.exports = connection;