import {Request, Response} from 'express';

import BaseController from './Common';
import Queue from '../schemas/Queue';
import QueueMessage from '../schemas/QueueMessage';
import User from '../schemas/User';
import { Console } from 'node:console';

export default class QueueController implements BaseController {

    constructor() {
    }

    async index(req: Request, res: Response){
    const queues = await Queue.find({});
        res.json(queues);
    }

    async newQueue(req: Request,  res: Response){
        try{
            const owner = await User.find({username: req.body.username});
            const newQueue = new Queue({
                name: req.params['queuename'],
                owner:  owner[0]?._id
            });
            await newQueue.save();
            res.status(200).send({queuename: newQueue?.getName()});
        }catch (err){
            console.log(err);
            res.status(400).send('The server could not understand the request due to invalid syntax');
        }

    }

    async deleteQueue(req: Request, res: Response){
        try{
            const user = await User.find({username: req.body.username}, null, {limit: 1});
            const queue = await Queue.find({name: req.params.queuename}, null, {limit: 1});
            if (user[0]?._id == queue[0]?._id){
                await Queue.findByIdAndRemove(queue[0]?._id);
                res.status(200).send('Queue deleted successfully.');
            }
        }catch (err){
            console.log(err);
            res.status(400).send('The server could not understand the request due to invalid syntax');
        }
    }

    async getMessage(req: Request, res: Response){
        try{
            const messages = await QueueMessage.find({name: req.params.queuename}).sort({date: 'descending'}).exec();
            const lastMessage = messages[0];
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
            console.log('params:', req.params);
            console.log('body:', req.body);
            const queue = await Queue.find({name: req.params.queuename}, null, {limit: 1});
            console.log('queue:', queue);
            const newMessage = new QueueMessage({
                message: req.body.message,
                queue: queue[0]?._id
            });
            await newMessage.save();
            res.status(200).send('Message created successfully.');
        }catch (err){
            console.log(err);
            res.status(400).send('The server could not understand the request due to invalid syntax');
        }
    }

}