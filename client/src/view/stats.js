/**
 * Created by ndyumin on 13.02.2016.
 */
import h from 'virtual-dom/h';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';
import createElement from 'virtual-dom/create-element';

const playerLine = (player) =>
    h('tr', {}, [
        h('td', {}, player.id),
        h('td', {}, player.score),
        h('td', {}, player.x),
        h('td', {}, player.y)
    ]);

const statsModal = ([visibility, state]) =>
    h('div', {className: 'modal', style: {'display': visibility ? 'block' : 'none'}},
        h('table', {}, [
            h('thead', {}, [
                h('td', {}, 'id'),
                h('td', {}, 'score'),
                h('td', {}, 'X'),
                h('td', {}, 'Y')
            ]),
            h('tbody', {},
                state.players.map(playerLine)
            )
        ]));

const EMPTY_TREE = h('div');

const getUpdater = (visibility$, model$) =>
    visibility$
        .withLatestFrom(model$)
        .map(statsModal)
        .scan((tree, newTree) => diff(tree, newTree), EMPTY_TREE);

module.exports = {
    getUpdater
};