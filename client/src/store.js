/**
 * Created by ndyumin on 30.01.2016.
 */

import Rx from 'rx-dom';

function store(init) {
    function _store($model) {
        return {
            plug: (stream$, reducer) => _store($model.combineLatest(stream$, reducer)),
            stream: () => $model
        };
    }

    return _store(Rx.Observable.of(init));
}

module.exports = store;