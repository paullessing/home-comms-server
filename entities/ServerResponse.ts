///<reference path='_all.ts' />

import * as Promise from 'bluebird';
import HttpStatus from '../entities/HttpStatus';

export class Response {
    constructor(private _status: HttpStatus, private _data?: any) {}

    get status() { return this._status }
    get data() { return this._data }

    static ok(data?: any) {
        return new Response(HttpStatus.OK, data);
    }
}

export type ServerResponse = Response | HttpStatus;

// TODO find out if I can do this using middleware
export function wrap(handler: ((req, res) => ServerResponse | Promise<ServerResponse>)): ((req, res) => any) {
    return function(req, res) {
        Promise.resolve(handler(req, res))
        .then((response: ServerResponse) => {
            if (response instanceof HttpStatus) {
                res.status(response.statusCode);
            } else if (response instanceof Response) {
                res.status(response.status.statusCode);
                if (response.data) {
                    res.send(response.data);
                }
            }
            res.end();
        }).catch(err => {
            console.error(err);
            if (err instanceof HttpStatus) {
                res.status(err).end();
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err).end();
            }
        });
    }
}