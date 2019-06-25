import { default as express, Application } from 'express';
import { Server } from 'http';
import { AddressInfo } from 'net';

import { Core } from '@core';
import { default as config } from '@config';
import { ErrorMiddleware } from '@core/middleware/error';
import { GlobalMiddleware } from '@core/middleware/global';
import { logger } from '@shared/helpers/logger';
import { presets as corePresets } from '@core/helpers/presets';
import { Validator } from '@shared/helpers/validation';

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
	}

	private loadModules(): void {
		Core.load(this.app);
	}

	private loadErrorHandling(): void {
		Core.loadFallback(this.app);
		this.app.use(ErrorMiddleware.handleError);
	}
}
