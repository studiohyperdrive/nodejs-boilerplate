import { ILoggerConfig } from '../config.types';

const presets: { [key: string]: ILoggerConfig } = {
	verbose: {
		enabled: [
			'debug',
			'info',
			'success',
			'warn',
			'error',
			'cron',
			'db',
		],
	},
	default: {
		enabled: [
			'info',
			'success',
			'warn',
			'error',
			'cron',
			'db',
		],
	},
	silent: {
		enabled: [
			'success',
			'error',
			'cron',
			'db',
		],
	},
	error: {
		enabled: [
			'error',
		],
	},
};

export default presets;
