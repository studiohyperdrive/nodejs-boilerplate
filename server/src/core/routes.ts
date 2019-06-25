import { Application } from 'express';

import { FallbackController } from './controllers/fallback';
import { StatusController } from './controllers/status';

export class CoreRoutes {
	public static baseUrl: string = '/';

	public static load(app: Application): void {
		// Get status
		app.route(`${this.baseUrl}status`).get(
			StatusController.get,
		);
	}

	public static loadFallback(app: Application): void {
		// Get fallback
		app.route(['/', '/*']).all(
			FallbackController.get,
		);
	}
}
