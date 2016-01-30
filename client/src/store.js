/**
 * Created by ndyumin on 30.01.2016.
 */

import Rx from 'rx-dom';

function store(init) {
    function _store(reducers) {
        console.log(reducers);

        const model = Rx.Observable
            .when(...reducers)
            .startWith(init);

        return {
            plug: (stream$, reducer) => _store(reducers.concat(stream$.thenDo(reducer))),
            stream: () => model
        };
    }

    return _store([]);
}

module.exports = store;