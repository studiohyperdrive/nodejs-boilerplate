import { Application } from 'express';

import { ISwaggerModels } from '~shared/shared.types';

import { models } from './core.models';
import { CoreRoutes } from './routes';

export class CoreModule {
	public static models: ISwaggerModels = models;

	public static load(app: Application): void {
		CoreRoutes.load(app);
	}

	public static loadFallback(app: Application): void {
		CoreRoutes.loadFallback(app);
	}
}
