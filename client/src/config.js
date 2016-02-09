import R from 'ramda';

const parseQuery = R.pipe(
    R.replace('?', ''), R.split('&'), R.reject(R.equals('')),
    R.map(R.pipe(decodeURIComponent, R.invoker(1, 'split')('='))),
    R.fromPairs
);

module.exports = function(opts = {}) {
    const defaults = {
        debug: false
    };

    const urlOptions = parseQuery(window.location.search);

    return Object.assign({}, defaults, urlOptions, opts);
};