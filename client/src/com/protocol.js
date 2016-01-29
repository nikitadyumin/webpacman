module.exports = {
    getPositionUpdateMessage: function (position) {
        return JSON.stringify({
            "type": "position",
            "data": position
        });
    }
};