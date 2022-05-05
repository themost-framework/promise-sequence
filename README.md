# @themost/promise-sequence
An extension for executing an array of promise in series

## Usage
    npm i @themost/promise-sequence

Execute an array of promises:

    import '@themost/promise-sequence'
    const results = await Promise.sequence([
        () => new Promise(...),
        () => new Promise(...)
    ]);
