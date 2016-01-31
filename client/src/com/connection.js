import Rx from 'rx-dom';

function connection(url, {onOpen, onClose}) {
    return Rx.DOM.fromWebSocket(url, null,
        Rx.Observer.create(onOpen),
        Rx.Observer.create(onClose)
    );
}

module.exports = connection;