// MOST Web Framework 2.0 Codename ZeroGravity BSD-3-Clause license Copyright (c) 2017-2022, THEMOST LP All rights reserved
type ExecutePromise = () => Promise<any>;

export declare class PromiseConstructor {
    sequence(values: ExecutePromise[]): any[];
}