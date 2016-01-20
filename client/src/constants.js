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
};

module.exports = {
    PACMAN: PACMAN,
    GENERAL: GENERAL,
    WALLS_OPTION: WALLS_OPTION,
    WALLS: WALLS
};
