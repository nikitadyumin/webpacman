import { EventEmitter } from 'events';
import Rx from 'rx';

function connection(url, {onOpen, onClose}) {
    const emitter = new EventEmitter();
    const ws = new WebSocket(url);
    ws.onclose = onClose;
    ws.onopen = onOpen;
    ws.onmessage = (ev) => emitter.emit('message', ev);

    return Object.assign(Rx.Observable.fromEvent(emitter, 'message'), {
        send: (msg) => ws.send(msg)
    });
}

module.exports = connection;