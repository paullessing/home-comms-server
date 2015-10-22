///<reference path='_all.ts' />

import { Router } from 'express';
import { Channel, Action } from '../entities/Channel';
import * as moment from 'moment';
import HttpStatus from "../entities/HttpStatus";
import { Response, wrap } from "../entities/ServerResponse";
import ChannelService from '../lib/ChannelService';

var router = Router();

router.put('/channel', wrap((req, res) => {
    var channelName = req.body.channelName;
    return ChannelService.create(channelName);
}));

router.get('/channel/:name/latest', wrap((req, res) => {
    var channelName = req.params.name;
    return ChannelService.getLatestAction(channelName);
}));

router.put('/channel/:name/action', wrap(function(req, res) {
    var channelName = req.params.name;
    var actionName = req.body.action;
    var data = req.body.data;

    return ChannelService.addAction(channelName, actionName, data);
}));

export default router;