import { default as Env } from '@studiohyperdrive/env';
import { default as express, Application } from 'express';
import { Server } from 'http';
import { AddressInfo } from 'net';

import { default as config } from '~config';
import { IConfig } from '~config/config.types';
import { CoreModule } from '~modules/core';
import { presets as corePresets } from '~modules/core/helpers/presets';
import { ErrorMiddleware } from '~modules/core/middleware/error';
import { GlobalMiddleware } from '~modules/core/middleware/global';
import { SwaggerMiddleware } from '~modules/core/middleware/swagger';
import { SampleModule } from '~modules/sample';
import { logger } from '~shared/helpers/logger';

export class App {
	public app: Application = express();
	public config: IConfig = CONFIG;
	public server: Server;

	constructor() {
		Env.validateEnv(corePresets.env.schema, corePresets.env.options);

		this.loadMiddleware();
		this.loadModules();
		this.loadErrorHandling();
	}

	public start(): void {
		this.server = this.app.listen(this.config.server.port, (err?: Error) => {
			if (err) {
				logger.error(err);
				return process.exit(1);
			}

			logger.info(`Server running on ${this.config.state.env} environment at port ${(this.server.address() as AddressInfo).port}`);
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
		if (this.config.state.docs) {
			SwaggerMiddleware.load(this.app, {
				...CoreModule.models,
				...SampleModule.V1.models,
			});
		}
	}

	private loadModules(): void {
		CoreModule.load(this.app);
		SampleModule.V1.load(this.app);
	}

	private loadErrorHandling(): void {
		CoreModule.loadFallback(this.app);
		this.app.use(ErrorMiddleware.handleError);
	}
}
export const CONFIG: IConfig = config;
