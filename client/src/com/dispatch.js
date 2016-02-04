module.exports = function (connection) {
    const messages = connection.map(message => JSON.parse(message.data));
    return {
        players$: messages.filter(m => m.type === 'players').map(m => m.data),
        self$: messages.filter(m => m.type === 'self').map(m => m.data),
        map$: messages.filter(m => m.type === 'map').map(m => m.data)
    };
};