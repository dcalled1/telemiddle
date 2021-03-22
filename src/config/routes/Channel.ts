import CommonRoutesConfig from './Common';
import {Application, Request, Response, NextFunction} from 'express';

//Schemas
import Channel from '../../schemas/Channel';
import ChannelMessage from '../../schemas/ChannelMessage';
import WorkerQueue from '../../schemas/WorkerQueue'

export default class ChannelsRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'ChannelsRoutes');
    }

    configureRoutes() {
        this.app.route(`/channels`)
        .get((req: Request, res: Response) => {
            res.status(200).send(`List of channels`);
        })
        .post((req: Request, res: Response) => {
            res.status(200).send(`list of channels`);
        });

        this.app.route(`/channels/newchannel/:channelid`)
        .all((req: Request, res: Response, next: NextFunction) => {
            // this middleware function runs before any request to /queues/:queueId
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
        .get((req: Request, res: Response) => {
            res.status(501).send(` Unimplemented new channel feature to process request for channel:${req.params.channelid}`);
        })
        .post((req: Request, res: Response) => {
            res.status(501).send(` Unimplemented new channel feature to process request for channel:${req.params.channelid}`);
        });

        this.app.route(`/channels/:channelid/:workerid/getmessage`)
        .all((req: Request, res: Response, next: NextFunction) => {
            // this middleware function runs before any request to /queues/:queueId
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
        .get((req: Request, res: Response) => {
            res.status(501).send(` Unimplemented get channel message feature to process request for channel:${req.params.channelid}, workerid:${req.params.workerid}`);
        })
        .post((req: Request, res: Response) => {
            res.status(501).send(` Unimplemented get channel message feature to process request for channel:${req.params.channelid}, workerid:${req.params.workerid}`);
        });

        this.app.route(`/channels/:channelid/newmessage`)
        .all((req: Request, res: Response, next: NextFunction) => {
            // this middleware function runs before any request to /queues/:queueId
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
        .get((req: Request, res: Response) => {
            res.status(501).send(` Unimplemented new channel message feature to process request for channel:${req.params.channelid}`);
        })
        .post((req: Request, res: Response) => {
            res.status(501).send(` Unimplemented new channel message feature to process request for channel:${req.params.channelid}`);
        });
        
        return this.app;
    }
}