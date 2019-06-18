import { default as express, Application } from 'express';
import { Server } from 'http';
import { AddressInfo } from 'net';

const app: Application = express();
let server: Server;

server = app.listen(process.env.PORT, () => {
	console.log(`Server running on ${process.env.NODE_ENV} environment at port ${(server.address() as AddressInfo).port}`);
});
