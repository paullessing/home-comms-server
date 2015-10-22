///<reference path='_all.ts' />

import * as Promise from 'bluebird';
import { Channel, Action } from '../entities/Channel';
import * as moment from 'moment';
import HttpStatus from "../entities/HttpStatus";
import { Response, ServerResponse } from "../entities/ServerResponse";
import { EventEmitter } from 'events';

class ChannelService extends EventEmitter {
    public getLatestAction(channelName: string): Promise<ServerResponse> {
        if (!channelName) {
            return Promise.resolve(HttpStatus.BAD_REQUEST);
        }
        return Channel.fetch(channelName).then((channel: Channel) => {
            var action = channel.lastAction;
            if (!action) {
                return HttpStatus.NO_CONTENT;
            } else {
                return Response.ok(action);
            }
        }).catch((err: any) => {
            return HttpStatus.NOT_FOUND;
        });
    }

    public create(channelName: string): Promise<ServerResponse> {
        console.log("Putting", channelName);
        if (!channelName) {
            console.log("No Name");
            return Promise.resolve(HttpStatus.BAD_REQUEST);
        }

        return Channel.exists(channelName).then(exists => {
            if (exists) {
                console.log("Conflict");
                return HttpStatus.CONFLICT;
            }
            console.log("No Conflict, creating");
            return Channel.create(channelName).then(() => {
                console.log("Created");
                return HttpStatus.CREATED;
            });
        });
    }

    public addAction(channelName: string, actionName: string, data?: any): Promise<ServerResponse> {
        if (!channelName) {
            console.log("No Name");
            return Promise.resolve(HttpStatus.NOT_FOUND);
        }
        if (!actionName) {
            console.log("No action");
            return Promise.resolve(HttpStatus.NOT_FOUND);
        }
        return Channel.fetch(channelName).then(channel => Promise.resolve(channel), (err: any) => {
            console.error(err);
            return Promise.reject(HttpStatus.NOT_FOUND); // Return early
        }).then(channel => {
            console.log("Got data", data);
            var action: Action = {
                name: actionName,
                timestamp: moment().toDate()
            };
            if (data) {
                action.data = data;
            }
            return channel.addAction(action).then(action => {
                this.emit('action', channelName, action);
                return action;
            });
        }).then(action => {
            return new Response(HttpStatus.CREATED, action);
        });
    }
}

export default new ChannelService();