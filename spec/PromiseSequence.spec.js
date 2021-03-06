
require('../index');
describe('PromiseSequence', () => {
    it('should execute promises in series', async () => {
        function promise1() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(1);
                }, 1000)
            });
        }
        function promise2() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(2);
                }, 500)
            });
        }
        const results = await Promise.sequence([
            () => promise1(),
            () => promise2()
        ]);
        expect(results).toBeInstanceOf(Array);
        expect(results[0]).toEqual(1);
        expect(results[1]).toEqual(2);
    });

    it('should execute functions in series', async () => {
        function promise1() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(1);
                }, 1000)
            });
        }
        function promise2() {
            return null;
        }
        const results = await Promise.sequence([
            () => promise1(),
            () => promise2()
        ]);
        expect(results).toBeInstanceOf(Array);
        expect(results[0]).toEqual(1);
        expect(results[1]).toEqual(null);
    });

    it('should execute promises and handle array results', async () => {
        function promise1() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(1);
                }, 1000)
            });
        }
        function promise2() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([2, 3]);
                }, 500)
            });
        }
        const results = await Promise.sequence([
            () => promise1(),
            () => promise2()
        ]);
        expect(results).toBeInstanceOf(Array);
        expect(results[0]).toEqual(1);
        expect(results[1]).toBeInstanceOf(Array);
        expect(results[1][0]).toEqual(2);

        function functionWithError() {
            throw new Error('Expected data');
        }

        await expectAsync(Promise.sequence([
            () => promise1(),
            () => functionWithError()
        ])).toBeRejectedWithError('Expected data');

    });

    it('should execute promises in series and handle errors', async () => {

        const utils = {
            promise() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(2);
                    }, 500)
                });
            },
            promiseWithError() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject(new Error('The operation was cancelled'));
                    }, 1000)
                });
            }
        }
        spyOn(utils, 'promise');
        await expectAsync(Promise.sequence([
            () => utils.promiseWithError(),
            () => utils.promise()
        ])).toBeRejectedWithError('The operation was cancelled');

        expect(utils.promise).toHaveBeenCalledTimes(0);

    });
});