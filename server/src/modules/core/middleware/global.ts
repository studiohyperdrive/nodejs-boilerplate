import { default as bodyParser } from 'body-parser';
import { default as cookieParser } from 'cookie-parser';
import { Application } from 'express';
import { default as helmet } from 'helmet';

export class GlobalMiddleware {
	public static load(app: Application): void {
		app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
		app.use(bodyParser.json({ limit: '50mb' }));

		app.use(cookieParser());

		app.use(helmet.hidePoweredBy());
		app.use(helmet.ieNoOpen());
		app.use(helmet.noSniff());
		app.use(helmet.xssFilter());
	}
}
