import CommonRoutesConfig from './Common';
import {Application, Request, Response, NextFunction} from 'express';

//Schemas
import Queue from '../../schemas/Queue';
import QueueMessage from '../../schemas/QueueMessage';

//Controller
import QueueController from '../../controllers/QueueController';
import UserController from '../../controllers/UserController';


export default class QueuesRoutes extends CommonRoutesConfig {

    controller: QueueController;
    userController: UserController;

    constructor(app: Application) {
        super(app, 'QueuesRoutes');
        this.controller = new QueueController();
        this.userController = new UserController();
    }

    configureRoutes() {
        this.app.route(`/queues`)
        .all(async (req: Request, res: Response, next: NextFunction) => {
            await this.userController.validateKey(req, res);
            if (req.body.validKey) next();
            else res.status(401).send('Unauthorized.');
        })
        .get(async (req: Request, res: Response) => {
            this.controller.index(req, res);
        })
        .post(async (req: Request, res: Response) => {
            this.controller.index(req, res);
        });

        this.app.route(`/queues/newqueue/:queuename`)
        .all(async (req: Request, res: Response, next: NextFunction) => {
            await this.userController.validateKey(req, res);
            if (req.body.validKey) next();
            else res.status(401).send('Unauthorized.');
        })
        .get(async (req: Request, res: Response) => {
            await this.controller.newQueue(req, res);
        })
        .post( async (req: Request, res: Response) => {
            await this.controller.newQueue(req, res);
        });

        this.app.route(`/queues/deletequeue/:queuename`)
        .all(async (req: Request, res: Response, next: NextFunction) => {
            await this.userController.validateKey(req, res);
            if (req.body.validKey) next();
            else res.status(401).send('Unauthorized.');
        })
        .get(async (req: Request, res: Response) => {
            await this.controller.deleteQueue(req, res);
        })
        .post(async (req: Request, res: Response) => {
            await this.controller.deleteQueue(req, res);
        });

        this.app.route(`/queues/:queuename/getmessage`)
        .all(async (req: Request, res: Response, next: NextFunction) => {
            await this.userController.validateKey(req, res);
            if (req.body.validKey) next();
            else res.status(401).send('Unauthorized.');
        })
        .get(async (req: Request, res: Response) => {
            await this.controller.getMessage(req, res);
        })
        .post(async (req: Request, res: Response) => {
            await this.controller.getMessage(req, res);
        });
        
        this.app.route(`/queues/:queuename/newmessage`)
        .all(async (req: Request, res: Response, next: NextFunction) => {
            await this.userController.validateKey(req, res);
            if (req.body.validKey) next();
            else res.status(401).send('Unauthorized.');
        })
        .get(async (req: Request, res: Response) => {
            await this.controller.newMessage(req, res);
        })
        .post(async (req: Request, res: Response) => {
            await this.controller.newMessage(req, res);
        });

        return this.app;
    }
}