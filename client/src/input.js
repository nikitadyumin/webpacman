/**
 * Created by ndyumin on 06.02.2016.
 */

function dispatchArrows([keyCode, model]) {
    const id = model.self.id;
    const self = model.players.filter(p => p.id === id).pop();
    const position = {
        x: self.x,
        y: self.y
    };

    const ARROWS = {
        LEFT: 37,
        TOP: 38,
        RIGHT: 39,
        BOTTOM: 40
    };

    switch (keyCode) {
        case ARROWS.LEFT:
            position.x -= 1;
            break;
        case ARROWS.TOP:
            position.y -= 1;
            break;
        case ARROWS.RIGHT:
            position.x += 1;
            break;
        case ARROWS.BOTTOM:
            position.y += 1;
            break;
    }

    return position;
}

const TAB = 9;
const isTab = c => c === TAB;

function dispatcher(element) {
    return function (model$) {
        const keydownCodes$ = Rx.DOM.keydown( element )
            .tap(e => e.preventDefault())
            .map(e => e.keyCode);

        const keyupCodes$ = Rx.DOM.keyup( element )
            .tap(e => e.preventDefault())
            .map(e => e.keyCode);

        return {
            positionUpdate$: keydownCodes$.withLatestFrom(model$).map(dispatchArrows),
            tabPressed$: keydownCodes$.filter(isTab).map(() => true)
                .merge(keyupCodes$.filter(isTab).map(() => false))
                .distinctUntilChanged()
                .startWith(false)
        };
    };
}

module.exports = dispatcher;