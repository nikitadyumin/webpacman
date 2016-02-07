/**
 * Created by ndyumin on 06.02.2016.
 */

function dispatchKeypress([keyCode, model]) {
    console.info(arguments);

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
        default:
            console.info(keyCode);
            break;
    }

    return position;
}

module.exports = {
    dispatchKeypress
};