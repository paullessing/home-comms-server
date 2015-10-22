///<reference path='_all.ts' />

import * as Promise from 'bluebird';
import { Document, Schema, Model, model, Query } from 'mongoose';
var Types = Schema.Types;

//#################//
//     Action      //
//#################//
export interface Action {
    name: string,
    seqId?: number,
    timestamp: Date,
    data?: any
}

interface ActionDocument extends Action, Document {
    name: string;
    seqId: number;
    //id: Types.ObjectId;
    timestamp: Date;
    data: any;
}

var ActionSchema = new Schema({
    name: {
        type: Types.String,
        required: true
    },
    seqId: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        'default': Date.now,
        required: true
    },
    data: {
        type: Types.Mixed,
        required: false
    }
});

var ActionModel = model<ActionDocument>("Action", ActionSchema);


//#################//
//     Channel     //
//#################//

var ChannelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    actions: [ActionSchema]
});

interface ChannelDocument extends Document {
    name: string;
    actions: Action[];
}

var ChannelModel = model<ChannelDocument>("Channel", ChannelSchema);

export class Channel {
    constructor(private mChannel: ChannelDocument) {
        this._lastUpdateId = mChannel.actions.length ? mChannel.actions[mChannel.actions.length - 1].seqId : 0;
    }

    public get name(): string { return name; }

    private _lastUpdateId: number = 0;
    public get lastUpdateId(): number { return this._lastUpdateId; }

    public addAction(action: Action): Promise<Action> {
        action.seqId = ++this._lastUpdateId;
        var mAction = new ActionModel(action);
        this.mChannel.actions.push(mAction);
        return Promise.resolve(this.mChannel.save()).then(() => mAction);
    }

    public get lastAction(): Action {
        if (this.mChannel.actions.length === 0) {
            return null;
        } else {
            return this.mChannel.actions[this.mChannel.actions.length - 1];
        }
    }

    public get actions(): Action[] {
        return this.mChannel.actions.slice();
    }

    public static create(name: string): Promise<Channel> {
        return Promise.resolve(new ChannelModel({ name: name, actions: [] }).save())
        .then((mChannel: ChannelDocument) => {
            return new Channel(mChannel);
        });
    }

    public static fetch(name: string): Promise<Channel> {
        console.log("Fetching");
        return Promise.resolve(ChannelModel.findOne({ name: name }))
        .then((mChannel: ChannelDocument) => { console.log(mChannel); return Promise.resolve(new Channel(mChannel)) })
            .catch(err => { console.log(err); return Promise.reject(err); });
    }

    public static exists(name: string): Promise<boolean> {
        console.log("Checking existence", name);
        return Channel.fetch(name).then(() => {
            console.log("Exists");
            return Promise.resolve(true);
        }).catch(err => {
            console.log("No Exists", err);
            return Promise.resolve(false);
        });
    }
}