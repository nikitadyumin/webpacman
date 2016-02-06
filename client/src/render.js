/**
 * Created by ndyumin on 04.02.2016.
 */

import { render as block_renderer } from './Map';

function debug_players_renderer(elem) {
    const clean = () =>
        Array.from(elem.querySelectorAll('span'))
            .forEach(e => {
                e.setAttribute('data-player', 'false')
            });

    return (players) => {
        clean();
        players.forEach(({id, x, y}) =>
            elem.childNodes[y].childNodes[x].setAttribute(
                'data-player',
                self === id ? 'self' : 'player'
            )
        )
    };
}

function debug_map_renderer(elem) {
    return (data) => elem.innerHTML = data.map(line =>
        '<div>' + line.map(cell =>
            `<span class="c${cell}">${cell}</span>`
        ).join('') + '</div>'
    ).join('');
}

function render(context, debug_element) {
    const debug_players = debug_players_renderer(debug_element);
    const debug_map = debug_map_renderer(debug_element);
    const render_map = block_renderer(context);

    return (model) => {
        debug_map(model.map);
        debug_players(model.players);
        render_map(model.map); // so slow >_<
    };
}

module.exports = {
    render
};