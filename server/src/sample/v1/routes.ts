import { Application } from 'express';

import { DataMiddleware } from '~shared/middleware/data';

import { SampleController } from './controllers/sample';
import { presets } from './helpers/presets';

export class SampleRoutes {
	public static baseUrl: string = '/v1/samples';
	public static controller: SampleController = new SampleController();

	public static load(app: Application): void {
		// Get all samples
		app.route(this.baseUrl).get(
			this.controller.getAll
		);

		// Get sample by id
		app.route(`${this.baseUrl}/:id`).get(
			DataMiddleware.copy,
			DataMiddleware.validate('params', presets.sample),
			this.controller.getById
		);

		// Create sample
		app.route(this.baseUrl).post(
			DataMiddleware.copy,
			DataMiddleware.validate('body', presets.sample),
			this.controller.create
		);
	}
}
