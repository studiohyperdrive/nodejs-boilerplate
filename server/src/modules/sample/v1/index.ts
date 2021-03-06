import { Application } from 'express';

import { ISwaggerModels } from '~shared/shared.types';

import { SampleRoutes } from './routes';
import { models } from './sample.models';

export class SampleModule {
	public static models: ISwaggerModels = models;

	public static load(app: Application): void {
		SampleRoutes.load(app);
	}
}
