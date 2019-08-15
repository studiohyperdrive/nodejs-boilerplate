import { default as loggerPresets } from './presets/logger';
import { EnvHelper } from './helpers/env';
import { IConfig, ILoggerPresets } from './config.types';

export default {
	state: {
		env: process.env.NODE_ENV,
		docs: EnvHelper.envToBoolean(process.env.STATE_DOCS),
		production: EnvHelper.envToBoolean(process.env.STATE_PRODUCTION),
		test: EnvHelper.envToBoolean(process.env.STATE_TEST),
	},
	server: {
		host: process.env.HOST,
		port: EnvHelper.envToNumber(process.env.PORT),
		timezone: process.env.TZ,
	},
	logger: loggerPresets[process.env['LOGGING_PRESET'] as ILoggerPresets],
} as IConfig;
