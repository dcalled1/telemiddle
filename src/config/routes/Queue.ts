import CommonRoutesConfig from './Common';
import {Application, Request, Response, NextFunction} from 'express';

//Schemas
import Queue from '../../schemas/Queue';

export default class QueuesRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'QueuesRoutes');
    }

    configureRoutes() {
        this.app.route(`/queues`)
        .get((req: Request, res: Response) => {
            res.status(200).send(`List of queues`);
        })
        .post((req: Request, res: Response) => {
            res.status(200).send(`List of queues`);
        });

        this.app.route(`/queues/newqueue/:queueid`)
        .all((req: Request, res: Response, next: NextFunction) => {
            // this middleware function runs before any request to /queues/:queueId/getmessage
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
        .get((req: Request, res: Response) => {
            res.status(501).send(` Unimplemented new queue feature to process request for queue:${req.params.queueid}`);
        })
        .post((req: Request, res: Response) => {
            res.status(501).send(` Unimplemented new queue feature to process request for queue:${req.params.queueid}`);
        });

        this.app.route(`/queues/:queueid/getmessage`)
        .all((req: Request, res: Response, next: NextFunction) => {
            // this middleware function runs before any request to /queues/:queueId/getmessage
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
        .get((req: Request, res: Response) => {
            res.status(501).send(` Unimplemented get queue message feature to process request for queue:${req.params.queueid}`);
        })
        .post((req: Request, res: Response) => {
            res.status(501).send(` Unimplemented get queue message feature to process request for queue:${req.params.queueid}`);
        });
        
        this.app.route(`/queues/:queueid/newmessage`)
        .all((req: Request, res: Response, next: NextFunction) => {
            // this middleware function runs before any request to /queues/:queueId/newmessage
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
        .get((req: Request, res: Response) => {
            res.status(501).send(` Unimplemented new queue message feature to process request for queue:${req.params.queueid}`);
        })
        .post((req: Request, res: Response) => {
            res.status(501).send(` Unimplemented new queue message feature to process request for queue:${req.params.queueid}`);
        });

        return this.app;
    }
}