import { Application } from 'express';

import { SwaggerModels } from '@shared/shared.types';

import { models } from './sample.models';
import { SampleRoutes } from './routes';

export class Sample {
	public static models: SwaggerModels = models;

	public static load(app: Application): void {
		SampleRoutes.load(app);
	}
}
