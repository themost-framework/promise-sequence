   
// MOST Web Framework 2.0 Codename ZeroGravity BSD-3-Clause license Copyright (c) 2017-2022, THEMOST LP All rights reserved
if (typeof Promise.sequence !== 'function') {
    /**
     * 
     * @callback ExecutePromise
     * @returns Promise<*>
     */

    /**
     * Executes an array of promises in series
     * @param {Array<ExecutePromise>} values 
     * @returns {Array<*>}
     */
    Promise.sequence = function promiseSequence(values) {
        return values.reduce((promise, item) => (
            promise.then((result) => (
                 item().then(Array.prototype.concat.bind(result))
            ))
        ), Promise.resolve([]));
    }
}