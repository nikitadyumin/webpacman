const R = require('ramda');
const CONSTANTS = require('./constants');
const drawHorizontalLine = (context, x, y) => {
    console.log(x, y);
};
const renderNonTraversable = (context, x, y, block) => {
    context.beginPath();
    context.strokeStyle = CONSTANTS.WALLS_OPTION.strokeStyle;
    context.lineWidth = CONSTANTS.WALLS_OPTION.lineWidth;
    context.lineCap = CONSTANTS.WALLS_OPTION.lineCap;

    const action = R.cond([[R.equals(CONSTANTS.WALLS.HORIZONTAL_LINE), R.always(drawHorizontalLine)],
        [R.T, R.always((msg) => console.log(msg))]
    ])(block);
    action(context, x, y);

};
const renderBlocks = R.curry((context, blocks) => {
    blocks.forEach((line, x) => {
        line.forEach((block, y) => {
            const action = R.cond([
                [R.allPass([R.lte(CONSTANTS.PACMAN.NON_TRAVERSABLE.l), R.gte(CONSTANTS.PACMAN.NON_TRAVERSABLE.r)]), R.always(renderNonTraversable)],
                [R.T, R.always((msg) => console.log(msg))]]
            )(block);
            action(context, x, y, block);
        })
    })
});


module.exports = {render: renderBlocks};