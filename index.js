   
// MOST Web Framework 2.0 Codename ZeroGravity BSD-3-Clause license Copyright (c) 2017-2022, THEMOST LP All rights reserved
if (typeof Promise.sequence !== 'function') {
    /**
     * 
     * @callback ExecutePromise
     * @returns Promise<*>
     */

    /**
     * @param {*} value 
     */
    function isPromise(value) {
        return value != null && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';
    }

    /**
     * Executes an array of promises in series
     * @param {Array<ExecutePromise>} values 
     * @returns {Array<*>}
     */
    Promise.sequence = function promiseSequence(values) {
        return values.reduce(function (promise, item) {
            return (promise.then(function (results) {
                const source = item();
                // validate a promise-like result
                if (source != null && (typeof source === 'object' || typeof source === 'function') && typeof source.then === 'function') {
                    return source.then(function(result) {
                        // wrap result to an array in order to use it as Array.concat() argument
                        return [result];
                    }).then(Array.prototype.concat.bind(results));
                }
                return Promise.resolve([source]).then(Array.prototype.concat.bind(results));
            }));
        }, Promise.resolve([]));
    }
}