/**
 * Created by ndyumin on 04.02.2016.
 */

function players_renderer(elem) {
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

function map_renderer(elem) {
    return (data) => elem.innerHTML = data.map(line =>
        '<div>' + line.map(cell =>
            `<span class="c${cell}">${cell}</span>`
        ).join('') + '</div>'
    ).join('');
}

function render(element) {
    const players = players_renderer(element);
    const map = map_renderer(element);
    return (model) => {
        map(model.map);
        players(model.players);
    };
}

module.exports = {
    render,
    players_renderer
};