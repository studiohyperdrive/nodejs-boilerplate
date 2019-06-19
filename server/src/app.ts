import { default as express, Application, Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import { AddressInfo } from 'net';

import { version } from '@pkg';

const app: Application = express();
let server: Server;

app.route('/status').get((req: Request, res:Response, next: NextFunction) => {
	return res.status(200).json({
		version,
		success: true,
	});
});

if (process.env.NODE_ENV !== 'test') {
	server = app.listen(process.env.PORT, () => {
		console.log(`Server running on ${process.env.NODE_ENV} environment at port ${(server.address() as AddressInfo).port}`); // tslint:disable-line no-console
	});
}

export default app;
