import express from 'express';
import morgan from 'morgan';


import CommonRoutesConfig from "./config/routes/Common"
import UsersRoutes from "./config/routes/User";
import ChannelsRoutes from "./config/routes/Channel";
import QueuesRoutes from "./config/routes/Queue";

class Application {

    app: express.Application;
    routes: Array<CommonRoutesConfig> = [];

    constructor() {
        this.app = express();
        this.setSettings();
        this.setMiddlewares();
        this.setRoutes();
    }

    setSettings() {
        this.app.set('port', process.env.APP_PORT ? process.env.APP_PORT : 3000);
    }

    setMiddlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true
        }));
    }

    setRoutes() {
        this.routes.push(new UsersRoutes(this.app));
        this.routes.push(new ChannelsRoutes(this.app));
        this.routes.push(new QueuesRoutes(this.app));
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server running in the port', this.app.get('port'))
        })
    }

}

export default Application;