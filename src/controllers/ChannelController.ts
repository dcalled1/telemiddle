import {Request, Response} from 'express';

import BaseController from './Common';
import Channel from '../schemas/Channel';
import ChannelMessage from '../schemas/ChannelMessage';
import WorkerQueue, {WorkerQueueDocument}  from '../schemas/WorkerQueue';
import User from '../schemas/User';
import { Console } from 'node:console';
import { measureMemory } from 'node:vm';

export default class ChannelController implements BaseController {

    constructor() {
    }

    async index(req: Request, res: Response){
    const channels = await Channel.find({});
        res.json(channels);
    }

    async newChannel(req: Request,  res: Response){
        try{
            const owner = await User.find({username: req.body.username});
            const newChannel = new Channel({
                name: req.params['channelname'],
                owner:  owner[0]?._id
            });
            await newChannel.save();
            res.status(200).send({queuename: newChannel?.getName()});
        }catch (err){
            console.log(err);
            res.status(400).send('The server could not understand the request due to invalid syntax');
        }

    }
    
    async deleteChannel(req: Request, res: Response){
        try{
            const user = await User.find({username: req.body.username}, null, {limit: 1});
            const channel = await Channel.find({name: req.params.channelname}, null, {limit: 1});
            console.log('owner?', user[0]?._id , '===', channel[0]?.getOwner(),user[0]?._id === channel[0]?.getOwner());
            if (user[0]?.id === channel[0]?.getOwner().toHexString()){
                await Channel.findByIdAndRemove(channel[0]?._id);
                res.status(200).send('Queue deleted successfully.');
            }
            else{
                res.status(400).send('The server could not understand the request due to invalid syntax');
            }
        }catch (err){
            console.log(err);
            res.status(400).send('The server could not understand the request due to invalid syntax');
        }
    }

    async newWorker(req: Request,  res: Response){
        try{
            const channel = await Channel.find({name: req.params.channelname});
            const newWorkerQueue = new WorkerQueue({
                name: req.params['workername'],
                channel:  channel[0]?._id
            });
            await newWorkerQueue.save();
            res.status(200).send({queuename: newWorkerQueue?.getName()});
        }catch (err){
            console.log(err);
            res.status(400).send('The server could not understand the request due to invalid syntax');
        }

    }

    async deleteWorker(req: Request, res: Response){
        try{
            const user = await User.find({username: req.body.username}, null, {limit: 1});
            const channel = await Channel.find({username: req.params.channelname}, null, {limit: 1});
            const workerQueue = await WorkerQueue.find({name: req.params.workername, channel: channel[0]?._id}, null, {limit: 1});
            console.log('owner?', user[0]?._id , '===', channel[0]?.getOwner(), user[0]?._id === channel[0]?.getOwner());
            if (user[0]?.id === channel[0]?.getOwner().toHexString()){
                await WorkerQueue.findByIdAndRemove(workerQueue[0]?._id);
                res.status(200).send('Queue deleted successfully.');
            }else{
                res.status(400).send('The server could not understand the request due to invalid syntax');
            }
        }catch (err){
            console.log(err);
            res.status(400).send('The server could not understand the request due to invalid syntax');
        }
    }

    async getMessage(req: Request, res: Response){
        try{
            const worker = await WorkerQueue.find({name: req.params.workername}, null, {limit: 1});
            console.log('worker: ', worker);
            const messages = await ChannelMessage.find({workerqueue: worker[0]?._id}).sort({date: 'descending'}).exec();
            const lastMessage = messages[0];
            console.log('messages: ', messages);
            await ChannelMessage.findByIdAndRemove(lastMessage?._id);
            res.status(200).send({
                message: lastMessage?.getMessage()
            });
        }catch (err){
            console.log(err);
            res.status(400).send('The server could not understand the request due to invalid syntax');
        }
    }

    async newMessage(req: Request, res: Response){
        try{
            const channel = await Channel.find({name: req.params.channelname}, null, {limit: 1});
            const workers = await WorkerQueue.find({channel: channel[0]?._id});
            await workers.forEach( async(queue) => {
                const newMessage = new ChannelMessage({
                    message: req.body.message,
                    workerqueue: queue._id
                });
                await newMessage.save();
            });
            res.status(200).send('Message created successfully.');
        }catch (err){
            console.log(err);
            res.status(400).send('The server could not understand the request due to invalid syntax');
        }
    }

}