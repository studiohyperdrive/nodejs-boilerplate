import { default as express, Application } from 'express';

import { GlobalMiddleware } from './global';

describe('[UNIT - CORE] GlobalMiddleware', () => {
	const app: Application = express();

	it('Should load the global middleware', (done: jest.DoneCallback) => {
		GlobalMiddleware.load(app);

		const middlewares: string[] = app._router.stack.map((layer: any) => layer.name); // tslint:disable-line no-any

		expect(middlewares).toContainValues([
			'urlencodedParser',
			'jsonParser',
			'cookieParser',
			'hidePoweredBy',
			'ienoopen',
			'nosniff',
			'xXssProtection',
		]);
		done();
	});
});
