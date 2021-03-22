import * as dotenv from "dotenv"

dotenv.config();

import App from './app'
import "./config/database";

const app = new App();

app.start();

