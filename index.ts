import express, {Application} from "express";
import * as http from "http"

import CommonRoutesConfig from "./config/routes/Common"
import UsersRoutes from "./config/routes/User";


const app: Application = express();

const server: http.Server = http.createServer(app);

const routes: Array<CommonRoutesConfig> = [];

routes.push(new UsersRoutes(app));


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req: express.Request, res: express.Response) => {
    res.send(`Server up and running!`);
});

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});


