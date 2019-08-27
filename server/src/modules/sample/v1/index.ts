import { Application } from 'express';

import { ISwaggerModels } from '@shared/shared.types';

import { models } from './sample.models';
import { SampleRoutes } from './routes';

export class SampleModule {
	public static models: ISwaggerModels = models;

	public static load(app: Application): void {
		SampleRoutes.load(app);
	}
}
