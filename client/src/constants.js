const PACMAN = {
    TRAVERSABLE: {l: 100, r: 199},
    NON_TRAVERSABLE: {l: 200, r: 299}
};

const GENERAL = {
    blockSize: 20
};

const WALLS_OPTION = {
    strokeStyle: '#2c2a80',
    lineWidth: 5,
    lineCap: 'round'
};
const WALLS = {
    HORIZONTAL_LINE: 200,
    VERTICAL_LINE: 201,
    BOTTOM_RIGHT_LINE: 202,
    BOTTOM_LEFT_LINE: 203,
    TOP_RIGHT_LINE: 204,
    TOP_LEFT_LINE: 205,
    TOP_CENTER_LINE: 206,
    BOTTOM_CENTER_LINE: 207,
    LEFT_CENTER_LINE: 208,
    RIGHT_CENTER_LINE: 209,
    BOTTOM_CURVE: 210,
    TOP_CURVE: 211,
    LEFT_CURVE: 212,
    RIGHT_CURVE: 213
};

module.exports = {
    PACMAN: PACMAN,
    GENERAL: GENERAL,
    WALLS_OPTION: WALLS_OPTION,
    WALLS: WALLS
};
