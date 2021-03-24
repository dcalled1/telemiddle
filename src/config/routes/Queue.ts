import CommonRoutesConfig from './Common';
import {Application, Request, Response, NextFunction} from 'express';

//Schemas
import Queue from '../../schemas/Queue';
import QueueMessage from '../../schemas/QueueMessage';

//Controller
import QueueController from '../../controllers/QueueController';


export default class QueuesRoutes extends CommonRoutesConfig {

    controller: QueueController;

    constructor(app: Application) {
        super(app, 'QueuesRoutes');
        this.controller = new QueueController();
    }

    configureRoutes() {
        this.app.route(`/queues`)
        .get((req: Request, res: Response) => {
            this.controller.index(req, res);
        })
        .post((req: Request, res: Response) => {
        });

        this.app.route(`/queues/newqueue/:queuename`)
        .all((req: Request, res: Response, next: NextFunction) => {
            // this middleware function runs before any request to /queues/:queueId/getmessage
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
        .get((req: Request, res: Response) => {
            this.controller.newQueue(req, res);
        })
        .post((req: Request, res: Response) => {
            this.controller.newQueue(req, res);
        });

        this.app.route(`/queues/deletequeue/:queuename`)
        .all((req: Request, res: Response, next: NextFunction) => {
            // this middleware function runs before any request to /queues/:queueId/getmessage
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
        .get((req: Request, res: Response) => {
            this.controller.deleteQueue(req, res);
        })
        .post((req: Request, res: Response) => {
            this.controller.deleteQueue(req, res);
        });

        this.app.route(`/queues/:queuename/getmessage`)
        .all((req: Request, res: Response, next: NextFunction) => {
            // this middleware function runs before any request to /queues/:queueId/getmessage
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
        .get((req: Request, res: Response) => {
            this.controller.getMessage(req, res);
        })
        .post((req: Request, res: Response) => {
            this.controller.getMessage(req, res);
        });
        
        this.app.route(`/queues/:queuename/newmessage`)
        .all((req: Request, res: Response, next: NextFunction) => {
            // this middleware function runs before any request to /queues/:queueId/newmessage
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
        .get((req: Request, res: Response) => {
            this.controller.newMessage(req, res);
        })
        .post((req: Request, res: Response) => {
            this.controller.newMessage(req, res);
        });

        return this.app;
    }
}