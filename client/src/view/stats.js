/**
 * Created by ndyumin on 13.02.2016.
 */
import h from 'virtual-dom/h';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';
import createElement from 'virtual-dom/create-element';

const statsModal = ([visibility, state]) =>
    h('div', {className: 'modal', style: {'display': visibility ? 'block' : 'none'}},
        h('table', {},
            h('tbody', {},
                h('tr', {},
                    h('td', {}, 'skjdhf'),
                    h('td', {}, 'skjdhf'),
                    h('td', {}, 'skjdhf')
                ),
                h('tr', {},
                    h('td', {}, '34f43'),
                    h('td', {}, '3f'),
                    h('td', {}, '3f34f')
                ),
                h('tr', {},
                    h('td', {}, '034kf'),
                    h('td', {}, '394jf'),
                    h('td', {}, '3j4f8j')
                )
            ))
    );

const EMPTY_TREE = h('div');

const getUpdater = (visibility$, model$) =>
    visibility$
        .withLatestFrom(model$)
        .map(statsModal)
        .scan((tree, newTree) => diff(tree, newTree), EMPTY_TREE);

module.exports = {
    getUpdater
};