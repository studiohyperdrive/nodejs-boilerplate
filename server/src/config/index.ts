import { default as Env } from '@studiohyperdrive/env';

import { IConfig } from './config.types';
import { default as loggerPresets } from './presets/logger';

export default {
	state: {
		env: Env.get('NODE_ENV'),
		docs: Env.getAsBoolean('STATE_DOCS'),
		production: Env.getAsBoolean('STATE_PRODUCTION'),
		test: Env.getAsBoolean('STATE_TEST'),
	},
	server: {
		host: Env.get('HOST'),
		port: Env.getAsNumber('PORT'),
		timezone: Env.get('TZ'),
	},
	logger: loggerPresets[Env.get('LOGGING_PRESET')],
} as IConfig;
