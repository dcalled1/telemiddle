import CommonRoutesConfig from './Common';
import { Application, Request, Response, NextFunction } from 'express';
import UserController from '../../controllers/UserController';

export default class UsersRoutes extends CommonRoutesConfig {
    controller: UserController;

    constructor(app: Application) {
        super(app, 'UsersRoutes');
        this.controller = new UserController();
    }

    configureRoutes() {
        this.app.route(`/users`)
            .get((req: Request, res: Response) => {
                this.controller.index(req, res);
            });

        this.app.route(`/users/new`)
            .all(async (req: Request, res: Response, next: NextFunction) => {
                await this.controller.validateUser(req, res);
                next();
            })
            .post((req: Request, res: Response) => {
                this.controller.registerUser(req, res);
            });

        this.app.route(`/users/key/new`)
            .all(async (req: Request, res: Response, next: NextFunction) => {
                await this.controller.validateUser(req, res);
                next();
            })
            .post((req: Request, res: Response) => {
                this.controller.registerKey(req, res);
            });

        this.app.route(`/validateKey`)
            .post((req: Request, res: Response) => {
                this.controller.validateKey(req, res);
            });

        

        return this.app;
    }
}