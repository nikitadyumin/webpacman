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

const drawTopLeftLine = (context, x, y) => {
    context.moveTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, y * CONSTANTS.GENERAL.blockSize);
    context.quadraticCurveTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize, x * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize);
};

const drawTopRightLine = (context, x, y) => {
    context.moveTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, y * CONSTANTS.GENERAL.blockSize);
    context.quadraticCurveTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize, (x + 1) * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize);
};

const drawTopCenterLine = (context, x, y) => {
    context.moveTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, y * CONSTANTS.GENERAL.blockSize);
    context.lineTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize);
};

const drawBottomCenterLine = (context, x, y) => {
    context.moveTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize);
    context.lineTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, (y + 1) * CONSTANTS.GENERAL.blockSize);
};

const drawLeftCenterLine = (context, x, y) => {
    context.moveTo((x) * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize);
    context.lineTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize);
};


const drawRightCenterLine = (context, x, y) => {
    context.moveTo((x + 1) * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize);
    context.lineTo((x + 0.5) * CONSTANTS.GENERAL.blockSize, (y + 0.5) * CONSTANTS.GENERAL.blockSize);
};


const drawBottomCurve = (context, x, y) => {
    drawBottomLeftLine(context, x, y);
    drawBottomRightLine(context, x, y);
};

const drawLeftCurve = (context, x, y) => {
    drawBottomLeftLine(context, x, y);
    drawTopLeftLine(context, x, y);
};

const drawRightCurve = (context, x, y) => {
    drawBottomRightLine(context, x, y);
    drawTopRightLine(context, x, y);
};

const drawTopCurve = (context, x, y) => {
    drawTopRightLine(context, x, y);
    drawTopLeftLine(context, x, y);
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
            [R.equals(CONSTANTS.WALLS.TOP_LEFT_LINE), R.always(drawTopLeftLine)],
            [R.equals(CONSTANTS.WALLS.TOP_RIGHT_LINE), R.always(drawTopRightLine)],

            [R.equals(CONSTANTS.WALLS.TOP_CENTER_LINE), R.always(drawTopCenterLine)],
            [R.equals(CONSTANTS.WALLS.BOTTOM_CENTER_LINE), R.always(drawBottomCenterLine)],
            [R.equals(CONSTANTS.WALLS.LEFT_CENTER_LINE), R.always(drawLeftCenterLine)],
            [R.equals(CONSTANTS.WALLS.RIGHT_CENTER_LINE), R.always(drawRightCenterLine)],

            [R.equals(CONSTANTS.WALLS.BOTTOM_CURVE), R.always(drawBottomCurve)],
            [R.equals(CONSTANTS.WALLS.LEFT_CURVE), R.always(drawLeftCurve)],
            [R.equals(CONSTANTS.WALLS.RIGHT_CURVE), R.always(drawRightCurve)],
            [R.equals(CONSTANTS.WALLS.TOP_CURVE), R.always(drawTopCurve)],

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