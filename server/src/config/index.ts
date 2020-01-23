import { IConfig } from './config.types';
import { EnvHelper } from './helpers/env';
import { default as loggerPresets } from './presets/logger';

export default {
	state: {
		env: process.env.NODE_ENV,
		docs: EnvHelper.envToBoolean('STATE_DOCS'),
		production: EnvHelper.envToBoolean('STATE_PRODUCTION'),
		test: EnvHelper.envToBoolean('STATE_TEST'),
	},
	server: {
		host: process.env.HOST,
		port: EnvHelper.envToNumber('PORT'),
		timezone: process.env.TZ,
	},
	logger: loggerPresets[process.env.LOGGING_PRESET],
} as IConfig;
