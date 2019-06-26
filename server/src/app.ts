import { AddressInfo } from 'net';
import { default as express, Application } from 'express';
import { Server } from 'http';

import { default as config } from '@config';
import { ErrorMiddleware } from '@core/middleware/error';
import { GlobalMiddleware } from '@core/middleware/global';
import { logger } from '@shared/helpers/logger';
import { presets as corePresets } from '@core/helpers/presets';
import { SwaggerMiddleware } from '@core/middleware/swagger';
import { Validator } from '@shared/helpers/validation';

import { Core } from '@core';
import { Sample } from '@sample';

export class App {
	public app: Application = express();
	public server: Server;

	constructor(start: boolean = true) {
		Validator.validate(process.env, corePresets.env, 'Invalid environment variables');

		this.loadMiddleware();
		this.loadModules();
		this.loadErrorHandling();

		if (start) {
			this.start();
		}
	}

	public start(): void {
		this.server = this.app.listen(config.server.port, (err?: Error) => {
			if (err) {
				logger.error(err);
				return process.exit(1);
			}

			logger.info(`Server running on ${config.state.env} environment at port ${(this.server.address() as AddressInfo).port}`);
		});
	}

	public stop(signal: NodeJS.Signals): void {
		logger.info(`Server stopped due to ${signal} signal, graceful shutdown`);
		this.server.close((err?: Error) => {
			if (err) {
				logger.error(err);
				return process.exit(1);
			}

			process.exit();
		});
	}

	private loadMiddleware(): void {
		GlobalMiddleware.load(this.app);
		if (config.state.docs) {
			SwaggerMiddleware.load(this.app, {
				...Core.models,
				...Sample.V1.models,
			});
		}
	}

	private loadModules(): void {
		Core.load(this.app);
		Sample.V1.load(this.app);
	}

	private loadErrorHandling(): void {
		Core.loadFallback(this.app);
		this.app.use(ErrorMiddleware.handleError);
	}
}
