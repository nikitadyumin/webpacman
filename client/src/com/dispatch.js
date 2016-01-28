module.exports = function (game, {onUnknown}) {
    const current = document.getElementById('current');
    const debug_render_map = (data) => current.innerHTML = data.map(line =>
        '<div>' + line.map(cell =>
            `<span class="c${cell}">${cell}</span>`
        ).join('') + '</div>'
    ).join('');


    const clean = () =>
        Array.from(document.querySelectorAll('#current span'))
            .forEach(e => {
                e.setAttribute('data-player', 'false')
            });

    let self = null;
    let map = [];
    let players = [];

    const update_self_id =({id}) => {
        self = id;
    };

    const debug_render_players =(players) => {
        clean();
        players.forEach(({id, x, y}) =>
            current.childNodes[y].childNodes[x].setAttribute(
                'data-player',
                self === id ? 'self' : 'player'
            )
        )
    };

    function render({map, players}) {
        debug_render_map(map);
        debug_render_players(players);
    }

    return function dispatch({data}) {
        const message = JSON.parse(data);
        switch (message.type) {
            case 'map':
                map = message.data;
                render({map, players});
                game.map(message.data);
                break;
            case 'self':
                update_self_id(message.data);
                break;
            case 'players':
                players = message.data;
                render({map, players});
                break;
            default:
                onUnknown(data);
                break;
        }
    }
};