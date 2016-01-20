const R = require('ramda');
const CONSTANTS = require('./constants');
const drawHorizontalLine = (context, x, y) => {
    context.moveTo(x * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize);
    context.lineTo((x + 1) * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize);
};

const drawVerticalLine = (context, x, y) => {
    context.moveTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, y * CONSTANTS.GENERAL.blockSize);
    context.lineTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, (y + 1) * CONSTANTS.GENERAL.blockSize);
};

const drawBottomRightLine = (context, x, y) => {
    context.moveTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, (y + 1) * CONSTANTS.GENERAL.blockSize);
    context.quadraticCurveTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize, (x + 1) * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize);
};

const drawBottomLeftLine = (context, x, y) => {
    context.moveTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, (y + 1) * CONSTANTS.GENERAL.blockSize);
    context.quadraticCurveTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize, x * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize);
};

const renderNonTraversable = (context, x, y, block) => {
    context.beginPath();
    context.strokeStyle = CONSTANTS.WALLS_OPTION.strokeStyle;
    context.lineWidth = CONSTANTS.WALLS_OPTION.lineWidth;
    context.lineCap = CONSTANTS.WALLS_OPTION.lineCap;

    const action =
        R.cond([
            [R.equals(CONSTANTS.WALLS.HORIZONTAL_LINE), R.always(drawHorizontalLine)],
            [R.equals(CONSTANTS.WALLS.VERTICAL_LINE), R.always(drawVerticalLine)],
            [R.equals(CONSTANTS.WALLS.BOTTOM_RIGHT_LINE), R.always(drawBottomRightLine)],
            [R.equals(CONSTANTS.WALLS.BOTTOM_LEFT_LINE), R.always(drawBottomLeftLine)],
            [R.T, R.always((msg) => console.log(msg))]
        ])(block);
    action(context, x, y);
    context.stroke();

};
const renderBlocks = R.curry((context, blocks) => {
    blocks.forEach((line, y) => {
        line.forEach((block, x) => {
            const action =
                R.cond([
                    [R.allPass([R.lte(CONSTANTS.PACMAN.NON_TRAVERSABLE.l), R.gte(CONSTANTS.PACMAN.NON_TRAVERSABLE.r)]), R.always(renderNonTraversable)],
                    [R.T, R.always((msg) => console.log(msg))]]
                )(block);
            action(context, x, y, block);
        })
    })
});


module.exports = {render: renderBlocks};