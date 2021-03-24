import CommonRoutesConfig from './Common';
import {Application, Request, Response, NextFunction} from 'express';

//Schemas
import Channel from '../../schemas/Channel';
import ChannelMessage from '../../schemas/ChannelMessage';
import WorkerQueue from '../../schemas/WorkerQueue'

//Controllers
import UserController from '../../controllers/UserController';
import ChannelController from '../../controllers/ChannelController';

export default class ChannelsRoutes extends CommonRoutesConfig {

    controller: ChannelController;
    userController: UserController;

    constructor(app: Application) {
        super(app, 'ChannelsRoutes');
        this.controller = new ChannelController();
        this.userController = new UserController();
    }

    configureRoutes() {
        this.app.route(`/channels`)
        .all(async (req: Request, res: Response, next: NextFunction) => {
            await this.userController.validateKey(req, res);
            if (req.body.validKey) next();
            else res.status(401).send('Unauthorized.');
        })
        .get((req: Request, res: Response) => {
            this.controller.index(req, res);
        })
        .post((req: Request, res: Response) => {
            this.controller.index(req, res);
        });

        this.app.route(`/channels/newchannel/:channelname`)
        .all(async (req: Request, res: Response, next: NextFunction) => {
            await this.userController.validateKey(req, res);
            if (req.body.validKey) next();
            else res.status(401).send('Unauthorized.');
        })
        .get((req: Request, res: Response) => {
            this.controller.newChannel(req, res);
        })
        .post((req: Request, res: Response) => {
            this.controller.newChannel(req, res);
        });

        this.app.route(`/channels/deletechannel/:channelname`)
        .all(async (req: Request, res: Response, next: NextFunction) => {
            await this.userController.validateKey(req, res);
            if (req.body.validKey) next();
            else res.status(401).send('Unauthorized.');
        })
        .get((req: Request, res: Response) => {
            this.controller.deleteChannel(req, res);
        })
        .post((req: Request, res: Response) => {
            this.controller.deleteChannel(req, res);
        });

        this.app.route(`/channels/:channelname/subscribe/:workername`)
        .all(async (req: Request, res: Response, next: NextFunction) => {
            await this.userController.validateKey(req, res);
            if (req.body.validKey) next();
            else res.status(401).send('Unauthorized.');
        })
        .get((req: Request, res: Response) => {
            this.controller.newWorker(req, res);
        })
        .post((req: Request, res: Response) => {
            this.controller.newWorker(req, res);
        });

        this.app.route(`/channels/:channelname/unsubscribe/:workername`)
        .all(async (req: Request, res: Response, next: NextFunction) => {
            await this.userController.validateKey(req, res);
            if (req.body.validKey) next();
            else res.status(401).send('Unauthorized.');
        })
        .get((req: Request, res: Response) => {
            this.controller.deleteWorker(req, res);
        })
        .post((req: Request, res: Response) => {
            this.controller.deleteWorker(req, res);
        });

        this.app.route(`/channels/:channelname/:workername/getmessage`)
        .all(async (req: Request, res: Response, next: NextFunction) => {
            await this.userController.validateKey(req, res);
            if (req.body.validKey) next();
            else res.status(401).send('Unauthorized.');
        })
        .get((req: Request, res: Response) => {
            this.controller.getMessage(req, res);
        })
        .post((req: Request, res: Response) => {
            this.controller.getMessage(req, res);
        });

        this.app.route(`/channels/:channelname/newmessage`)
        .all(async (req: Request, res: Response, next: NextFunction) => {
            await this.userController.validateKey(req, res);
            if (req.body.validKey) next();
            else res.status(401).send('Unauthorized.');
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