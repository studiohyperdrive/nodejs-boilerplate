import { Application } from 'express';

import { DataMiddleware } from '@shared/middleware/data';

import { presets } from './helpers/presets';
import { SampleController } from './controllers/sample';

export class SampleRoutes {
	public static baseUrl: string = '/v1/samples';

	public static load(app: Application): void {
		// Get all samples
		app.route(this.baseUrl).get(
			SampleController.getAll,
		);

		// Get sample by id
		app.route(`${this.baseUrl}/:id`).get(
			DataMiddleware.copy,
			DataMiddleware.validate('params', presets.sample),
			SampleController.getById,
		);

		// Create sample
		app.route(this.baseUrl).post(
			DataMiddleware.copy,
			DataMiddleware.validate('body', presets.sample),
			SampleController.create,
		);
	}
}
