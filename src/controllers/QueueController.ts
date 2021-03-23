import {Request, Response} from 'express';

import BaseController from './Common';
import Queue from '../schemas/Queue';
import QueueMessage from '../schemas/QueueMessage';
import User from '../schemas/User';
import { Console } from 'node:console';

export default class QueueController implements BaseController {

    constructor() {
    }

    async newQueue(req: Request,  res: Response){
        try{
            const owner = await User.find({username: req.body.username}, null, {limit: 1});
            const newQueue = new Queue({
                name: req.params['queuename'],
                owner:  owner[0]?._id
            });
            await newQueue.save();
            res.status(200).send('Queue created successfully.');
        }catch (err){
            console.log(err);
            res.status(400).send(err);
        }

    }

    async deleteQueue(req: Request, res: Response){
        try{
            const user = await User.find({username: req.body.username}, null, {limit: 1});
            const queue = await Queue.findById(req.params.queueid);
            if (user[0]?._id == queue?._id){
                await Queue.findByIdAndRemove();
                res.status(200).send('Queue deleted successfully.');
            }
        }catch (err){
            console.log(err);
            res.status(400).send(err);
        }
    }

    async getMessage(req: Request, res: Response){
        try{
            const messages = await QueueMessage.find({queue: req.params.queueid}).sort({date: 'descending'}).exec();
            const lastMessage = messages[0];
            res.status(200).send({
                message: lastMessage
            });
        }catch (err){
            console.log(err);
            res.status(400).send(err);
        }
    }

    async newMessage(req: Request, res: Response){
        try{
            const newMessage = new QueueMessage({
                message: req.body.message,
                queue: req.params.queueid
            });
            await newMessage.save();
            res.status(200).send('Message created successfully.');
        }catch (err){
            console.log(err);
            res.status(400).send(err);
        }
    }

}