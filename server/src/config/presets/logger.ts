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
		filesystem: {
			enabled: false,
			path: '',
		},
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
		filesystem: {
			enabled: false,
			path: '',
		},
	},
	silent: {
		enabled: [
			'success',
			'error',
			'cron',
			'db',
		],
		filesystem: {
			enabled: false,
			path: '',
		},
	},
	error: {
		enabled: [
			'error',
		],
		filesystem: {
			enabled: false,
			path: '',
		},
	},
};

export default presets;
