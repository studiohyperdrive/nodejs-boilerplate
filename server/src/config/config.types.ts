import { NodejsOptions } from '@studiohyperdrive/logger';

export type Envs = 'local' | 'test' | 'development' | 'staging' | 'production';
export type LoggerConfig = NodejsOptions;
export type LoggerPresets = 'default' | 'verbose' | 'silent';

export interface StateConfig {
	env: Envs;
	docs: boolean;
	production: boolean;
	test: boolean;
}

export interface ServerConfig {
	host: string;
	port: number;
	timezone: string;
}

export interface Config {
	state: StateConfig;
	server: ServerConfig;
	logger: LoggerConfig;
}
