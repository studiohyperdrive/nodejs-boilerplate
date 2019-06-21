import { LoggerConfig } from '../config.types';

const presets: { [key: string]: LoggerConfig } = {
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
};

export default presets;
