import { Application } from 'express';

import { SampleRoutes } from './routes';

export class Sample {
	public static load(app: Application): void {
		SampleRoutes.load(app);
	}
}
