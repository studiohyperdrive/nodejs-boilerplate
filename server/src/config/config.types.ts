import { NodejsOptions } from '@studiohyperdrive/logger';

export type ILoggerConfig = NodejsOptions;

export enum Envs {
	local = 'local',
	test = 'test',
	development = 'development',
	staging = 'staging',
	production = 'production',
}

export enum LoggerPresets {
	default = 'default',
	verbose = 'verbose',
	silent = 'silent',
	error = 'error',
}

export interface IStateConfig {
	env: Envs;
	docs: boolean;
	production: boolean;
	test: boolean;
}

export interface IServerConfig {
	host: string;
	port: number;
	timezone: string;
}

export interface IConfig {
	state: IStateConfig;
	server: IServerConfig;
	logger: ILoggerConfig;
}
