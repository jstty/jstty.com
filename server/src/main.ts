// Express
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

// NestJs
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ApiModule } from './api.module';

const server: express.Express = express();
/* Express middleware. */
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());
/* End of express middleware. */

const startNestApplication = async (expressInstance: express.Express) => {
    const app = await NestFactory.create(ApiModule, new ExpressAdapter(expressInstance));
    await app.init();
    console.log('NestJS Ready!');
    return app;
};
const nestApp = startNestApplication(server);

export default server;
