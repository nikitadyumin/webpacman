const map = require('./Map');

module.exports = function gameStarter(element) {
    const blockSize = element.offsetWidth / 19,
        canvas = document.createElement('canvas');

    canvas.setAttribute('width', (blockSize * 19) + 'px');
    canvas.setAttribute('height', (blockSize * 22) + 65 + 'px');
    element.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const mapRender = map.render(ctx);
    return {map: mapRender};
};
