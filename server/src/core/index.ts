import { Application } from 'express';

import { ISwaggerModels } from '@shared/shared.types';

import { CoreRoutes } from './routes';
import { models } from './core.models';

export class Core {
	public static models: ISwaggerModels = models;

	public static load(app: Application): void {
		CoreRoutes.load(app);
	}

	public static loadFallback(app: Application): void {
		CoreRoutes.loadFallback(app);
	}
}
