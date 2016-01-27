module.exports = function (game, {onUnknown}) {
    const current = document.getElementById('current');
    const debug_render = (data) => current.innerHTML = data.map(line =>
        '<div>' + line.map(cell =>
            `<span class="c${cell}">${cell}</span>`
        ).join('') + '</div>'
    ).join('');

    return function dispatch({data}) {
        const message = JSON.parse(data);
        switch (message.type) {
            case 'map':
                debug_render(message.data);
                game.map(message.data);
                break;
            default:
                onUnknown(data);
                break;
        }
    }
};